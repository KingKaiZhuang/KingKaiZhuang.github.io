---
layout: post
title: Yolov9 實作練習
date: 2025-10-26
tags:
categories:
  - "ai"
  - "pytorch"
top_img: /images/YOLOv9.png
cover: /images/YOLOv9.png
---

內容全參考影片 : [https://www.youtube.com/watch?v=tMwyxKttZd0&t=60s](https://www.youtube.com/watch?v=tMwyxKttZd0&t=60s)

![](/images/image-10.png)

首先建立一個Conda的虛擬環境，之後進入後先下載labelImg。

```
(Labelimg) C:\Users\pudy6>pip install labelImg
```

```
(Labelimg) C:\Users\pudy6>pip install labelImg
```

如果labelImg閃退，建議不用進到虛擬環境，直接去下載[LabelImg](https://github.com/HumanSignal/labelImg/releases)。

![](/images/image-11-1024x594.png)

建立一個dataset資料夾

```
dataset
├─images
│  ├─test(測試集)
│  ├─train(訓練集)
│  └─val(驗證集)
└─labels
    ├─test
    ├─train
    └─val
```

```
dataset
├─images
│  ├─test(測試集)
│  ├─train(訓練集)
│  └─val(驗證集)
└─labels
    ├─test
    ├─train
    └─val
```

8:1:1

![](/images/image-12-1024x594.png)

點擊Open Dir打開訓練集的圖片資料夾。

![](/images/image-26.png)

![](/images/image-14-1024x594.png)

接著要選擇剛剛資料夾中的Label資料夾

![](/images/image-25.png)

![](/images/image-16-1024x594.png)

![](/images/image-17-1024x593.png)

要改成YOLO的格式，就可以開始框了

![](/images/image-18-1024x542.png)

建議開啟這兩個。

接著下載[yolov9](https://github.com/WongKinYiu/yolov9)的專案包，解壓縮後進入資料夾。

我將yolov9-main改為yolov9，依據個人喜好。

```
(Labelimg) C:\Users\pudy6\Desktop\yolov9>pip install -r requirements.txt
```

```
(Labelimg) C:\Users\pudy6\Desktop\yolov9>pip install -r requirements.txt
```

接著安裝相關套件，然後進入到PyTorch依據自己的版本下載。

![](/images/image-21-1024x459.png)

![](/images/image-19.png)

安裝的過程我們可以先將dataset搬到data底下。

![](/images/image-20-1024x664.png)

接著更改coco.yaml這支檔案我將它改名為datasets.yaml。

![](/images/image-22-1024x554.png)

### train.py 參數解析：

| 參數 | 你目前設定值 | 說明 |
| --- | --- | --- |
| `--weights` | `yolov9-c-converted.pt` | 預訓練權重（模型初始值） |
| `--data` | `data/datasets.yaml` | 資料集配置（train/val 路徑與類別） |
| `--hyp` | `data/hyps/hyp.scratch-high.yaml` | 超參數設定（學習率、增強等） |
| `--epochs` | `100` | 訓練回合數 |
| `--batch-size` | `4` | 每次訓練批次（因為 GPU 6GB 限制） |
| `--img` | `512` | 訓練圖片大小（寬高） |
| `--device` | `0` | 使用 GPU 0（RTX 2060） |
| `--workers` | `1` | 資料載入執行緒數量（Windows 建議設低） |
| `--cache` | 開啟 | 預先載入影像，加快訓練速度 |
| `--optimizer` | 預設 `SGD` | 最佳化器（可改為 Adam / AdamW） |
| `--freeze` | `[0]` | 不凍結層（全部訓練） |
| `--single-cls` | False | 多類別訓練 |
| `--project` | `runs/train` | 輸出資料夾 |
| `--name` | `exp7` | 訓練結果名稱 |
| `--save-period` | `-1` | 不定期保存模型（僅保存最佳/最後） |
| `--noval` | False | 每個 epoch 都驗證 |
| `--patience` | `100` | 提前停止條件（未改） |

### 超參數檔（hyp.scratch-high.yaml）主要內容：

| 超參數 | 你目前設定 | 說明 |
| --- | --- | --- |
| `lr0` | 0.01 | 初始學習率 |
| `lrf` | 0.01 | 最終學習率比例 |
| `momentum` | 0.937 | 動量（影響更新穩定性） |
| `weight_decay` | 0.0005 | 權重衰減（防止過擬合） |
| `box` | 7.5 | 邊界框損失權重 |
| `cls` | 0.5 | 類別損失權重 |
| `obj` | 0.7 | 物件置信度損失權重 |
| `iou_t` | 0.2 | IoU 閾值 |
| `fl_gamma` | 0.0 | Focal Loss 參數 |
| `hsv_h/s/v` | 0.015 / 0.7 / 0.4 | 顏色增強（色相、飽和度、亮度） |
| `translate` | 0.1 | 平移比例 |
| `scale` | 0.9 | 縮放比例 |
| `mixup` | 0.15 | 圖像混合比例 |
| `copy_paste` | 0.3 | 分割貼上比例 |

調整完後就可以開始訓練。

![](/images/image-23-1024x448.png)

## 二、驗證指令 val.py

```
(Labelimg) C:\Users\pudy6\Desktop\yolov9>python val.py
```

```
(Labelimg) C:\Users\pudy6\Desktop\yolov9>python val.py
```

跑完後你會在runs\\val\\exp2看到驗證後的圖像。

![](/images/image-24-1024x604.png)

## YOLOv9 訓練相關問題

### ❌ 問題 1：`File not found: data/hyps/hyp.scratch-low.yaml`

**原因：** 檔案路徑錯誤或名稱不一致。

**✅ 解法：**  
確定你有這些檔案：

```
yolov9/data/hyps/hyp.scratch-low.yaml
yolov9/data/hyps/hyp.scratch-high.yaml
```

```
yolov9/data/hyps/hyp.scratch-low.yaml
yolov9/data/hyps/hyp.scratch-high.yaml
```

如果沒有，從官方 repo 重新下載或複製一份。
