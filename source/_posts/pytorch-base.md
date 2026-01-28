---
layout: post
title: Pytorch Quickstart
date: 2025-10-20
tags:
categories:
  - "ai"
  - "pytorch"
top_img: /images/Pytorch.png
cover: /images/Pytorch.png
---

程式碼來源：[https://docs.pytorch.org/tutorials/beginner/basics/quickstart\_tutorial.html](https://docs.pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html)

```
import torch
# 匯入 nn（neural network）子模組
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.transforms import ToTensor
```

```
import torch
# 匯入 nn（neural network）子模組
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.transforms import ToTensor
```

`nn` 是用來「定義網路結構」的模組。

DataLoader 幫你自動把 dataset 切成一批一批（batch）。在每個 epoch 打亂（shuffle）資料。

torchvision.datasets 這是 PyTorch 針對「影像資料集」的工具庫。  
常見的像 `MNIST`, `CIFAR10`, `ImageNet` 都可以直接用這個模組下載與載入。

ToTensor() 用來把影像（通常是 PIL Image 或 NumPy 陣列）轉成 PyTorch 的 Tensor 格式。  
同時會自動把像素值從 `[0, 255]` 轉成 `[0.0, 1.0]`。

```
# Download training data from open datasets.
training_data = datasets.FashionMNIST(
    root="data",
    train=True,
    download=True,
    transform=ToTensor(),
)
<div></div>
# Download test data from open datasets.
test_data = datasets.FashionMNIST(
    root="data",
    train=False,
    download=True,
    transform=ToTensor(),
)
```

```
# Download training data from open datasets.
training_data = datasets.FashionMNIST(
    root="data",
    train=True,
    download=True,
    transform=ToTensor(),
)

# Download test data from open datasets.
test_data = datasets.FashionMNIST(
    root="data",
    train=False,
    download=True,
    transform=ToTensor(),
)
```

## training\_data 訓練資料

`datasets.FashionMNIST`：  
這是 PyTorch 內建的 **Fashion-MNIST 資料集**，  
它是一組 **灰階 28×28 的衣物影像**（共有 10 類，像是 T-shirt、鞋子、包包等）。  
可以視為「MNIST（手寫數字）」的進階版。

`root="data"`：  
指定資料儲存的資料夾名稱（PyTorch 會自動在這個資料夾裡建立結構）。  
若資料不存在，會在 `"data/"` 底下建立子資料夾並下載。

`train=True`：  
表示這是**訓練集**（training set），  
FashionMNIST 總共有：

- 訓練資料：60,000 張圖片

- 測試資料：10,000 張圖片

`download=True`：  
若本地端還沒有資料集，就自動幫你從官方網站下載。

`transform=ToTensor()`：  
將每張影像轉換成 PyTorch 的 **Tensor** 格式，  
並且把像素值從 `[0, 255]` 正規化到 `[0.0, 1.0]`。

轉換後的每張圖大小是 `(1, 28, 28)`，代表：`1` 個通道（灰階），`28×28` 像素。

## test\_data 測試資料

`train=False` → 表示這是**測試集**（test set）。用來在訓練完模型後驗證準確率。

* * *

```
batch_size = 64
<div></div>
# Create data loaders.
train_dataloader = DataLoader(training_data, batch_size=batch_size)
test_dataloader = DataLoader(test_data, batch_size=batch_size)
<div></div>
for X, y in test_dataloader:
    print(f"Shape of X [N, C, H, W]: {X.shape}")
    print(f"Shape of y: {y.shape} {y.dtype}")
    break
```

```
batch_size = 64

# Create data loaders.
train_dataloader = DataLoader(training_data, batch_size=batch_size)
test_dataloader = DataLoader(test_data, batch_size=batch_size)

for X, y in test_dataloader:
    print(f"Shape of X [N, C, H, W]: {X.shape}")
    print(f"Shape of y: {y.shape} {y.dtype}")
    break
```

> 輸出結果 : Shape of X \[N, C, H, W\]: torch.Size(\[64, 1, 28, 28\]) Shape of y: torch.Size(\[64\]) torch.int64

`DataLoader` 的功能：

自動把 dataset 拆成一批批（依照 batch\_size）。

每次用 `for` 迴圈取資料時，會自動回傳一組 `(X, y)`：

- `X`: 一批圖片

- `y`: 一批標籤

batch\_size = 64 模型訓練或測試時，每次會從資料集中取出 64 筆樣本。

N: 筆數 C: RGB H: 高度 W: 寬度

| 符號 | 意義 | 實際數值 | 說明 |
| --- | --- | --- | --- |
| `N` | batch size | 64 | 每次讀 64 張圖片 |
| `C` | channels | 1 | 灰階圖像（只有 1 個通道） |
| `H` | height | 28 | 高度 28 pixels |
| `W` | width | 28 | 寬度 28 pixels |

## Creating Models 建立模型

```
＃ AMD or MAC M1... or NVIDIA
device = torch.accelerator.current_accelerator().type if torch.accelerator.is_available() else "cpu"
print(f"Using {device} device")
<div></div>
# Define model
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512), ＃ 輸入,輸出神經元個數
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10)
        )
    
    ＃ x 就是 28 * 28的資料
    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits
<div></div>
model = NeuralNetwork().to(device)
print(model)
```

```
＃ AMD or MAC M1... or NVIDIA
device = torch.accelerator.current_accelerator().type if torch.accelerator.is_available() else "cpu"
print(f"Using {device} device")

# Define model
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512), ＃ 輸入,輸出神經元個數
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10)
        )
    
    ＃ x 就是 28 * 28的資料
    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits

model = NeuralNetwork().to(device)
print(model)
```

輸出結果：

```
Using cuda device
NeuralNetwork(
  (flatten): Flatten(start_dim=1, end_dim=-1)
  (linear_relu_stack): Sequential(
    (0): Linear(in_features=784, out_features=512, bias=True)
    (1): ReLU()
    (2): Linear(in_features=512, out_features=512, bias=True)
    (3): ReLU()
    (4): Linear(in_features=512, out_features=10, bias=True)
  )
)
```

```
Using cuda device
NeuralNetwork(
  (flatten): Flatten(start_dim=1, end_dim=-1)
  (linear_relu_stack): Sequential(
    (0): Linear(in_features=784, out_features=512, bias=True)
    (1): ReLU()
    (2): Linear(in_features=512, out_features=512, bias=True)
    (3): ReLU()
    (4): Linear(in_features=512, out_features=10, bias=True)
  )
)
```

### 初始化神經層結構

- 先定義每一層的結構（例如 Flatten、Linear、ReLU 等）。

- 透過 `forward()` 函式，把各神經層串接起來，形成資料的運算流程。

* * *

### `nn.Flatten()`

- 功能：將影像從二維 (H×W) 攤平成一維 (向量)。

- 原因：神經元無法直接讀取二維資料，必須轉成一維輸入。

- 從 `(1, 28, 28)` 攤平成一維 `(784,)`。

* * *

### `nn.Sequential()`

- 功能：將多個神經層打包成一個順序結構，使程式更簡潔。

- 常見組合：`Linear`（線性層）搭配 `ReLU`（激活函數）。

- 範例：`nn.Sequential(nn.Linear(784, 512), nn.ReLU())`。

* * *

### `.to(device)`

- 功能：指定模型運行的裝置。

- 若系統有 GPU，會將整個神經網路搬移到 GPU 執行，以加快訓練速度。

- 範例：`model.to("cuda")`。

## Optimizing the Model Parameters 優化模型參數

```
loss_fn = nn.CrossEntropyLoss() #分類
optimizer = torch.optim.SGD(model.parameters(), lr=1e-3) #最佳化 lr = 0.001
```

```
loss_fn = nn.CrossEntropyLoss() #分類
optimizer = torch.optim.SGD(model.parameters(), lr=1e-3) #最佳化 lr = 0.001
```

CrossEntropyLoss 有兩個功能 :

- **Softmax**（把模型輸出的 logits 轉為機率分佈）

- **Negative Log-Likelihood (NLLLoss)**（衡量預測與真實答案的差距）

SGD、Adam 都是適應性的演算法，動態調整 learning rate。

model.parameters() : 權重的更新

lr=1e-3 ：學習率（learning rate）= 0.001，控制每次更新的步伐大小。

```
def train(dataloader, model, loss_fn, optimizer):
    size = len(dataloader.dataset)
    model.train() #切換到訓練模式
    for batch, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device) #放倒GPU
<div></div>
        # Compute prediction error
        pred = model(X)
        loss = loss_fn(pred, y)
<div></div>
        # Backpropagation
        loss.backward() #反向傳播 計算梯度
        optimizer.step() #學東西
        optimizer.zero_grad() #將上一次的參數歸零
<div></div>
        if batch % 100 == 0:
            loss, current = loss.item(), (batch + 1) * len(X
            print(f"loss: {loss:>7f}  [{current:>5d}/{size:>5d}]")
```

```
def train(dataloader, model, loss_fn, optimizer):
    size = len(dataloader.dataset)
    model.train() #切換到訓練模式
    for batch, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device) #放倒GPU

        # Compute prediction error
        pred = model(X)
        loss = loss_fn(pred, y)

        # Backpropagation
        loss.backward() #反向傳播 計算梯度
        optimizer.step() #學東西
        optimizer.zero_grad() #將上一次的參數歸零

        if batch % 100 == 0:
            loss, current = loss.item(), (batch + 1) * len(X
            print(f"loss: {loss:>7f}  [{current:>5d}/{size:>5d}]")
```

`len(dataloader.dataset)`：取得整個訓練資料集的總筆數。

`model.train()`：設定為訓練模式（啟用 dropout、batchnorm 等訓練專用層的行為）。

使用 `enumerate(dataloader)`：一批一批地從 DataLoader 拿資料。`(X, y)`：`X` 是輸入影像，`y` 是真實標籤。

`.to(device)`：把資料放到相同的裝置上（如 GPU），確保和模型一致。

```
pred = model(X)
```

```
pred = model(X)
```

把圖片送進模型，取得預測結果（logits）。此時 `pred` 的形狀會是 `[64, 10]`（64 張圖、10 類別）。

```
loss = loss_fn(pred, y)
```

```
loss = loss_fn(pred, y)
```

用損失函數得到目前這一批的「平均誤差」。

loss.backward() : 計算梯度（反向傳遞 Backpropagation）

optimizer.step() : 根據梯度更新模型權重

optimizer.zero\_grad() : 清空舊梯度（避免累積）

最後每 100 個 batch 顯示一次進度與目前損失值。

```
def test(dataloader, model, loss_fn):
    size = len(dataloader.dataset)
    num_batches = len(dataloader)
    model.eval()
    test_loss, correct = 0, 0
    with torch.no_grad():
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)
            pred = model(X)
            test_loss += loss_fn(pred, y).item() #比對64筆資料
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()
    test_loss /= num_batches
    correct /= size
    print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f} \n")
```

```
def test(dataloader, model, loss_fn):
    size = len(dataloader.dataset)
    num_batches = len(dataloader)
    model.eval()
    test_loss, correct = 0, 0
    with torch.no_grad():
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)
            pred = model(X)
            test_loss += loss_fn(pred, y).item() #比對64筆資料
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()
    test_loss /= num_batches
    correct /= size
    print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f} \n")
```

`size`：測試資料總筆數（例如 10,000 張 FashionMNIST 圖）

`num_batches`：DataLoader 的批次數量（例如 10,000 ÷ 64 ≈ 157 批）

model.eval() : 把模型切換為 evaluation mode (評估模式)。

argmax(list) : 選出數字最大的，然後取出索引值。

test\_loss越小表示學習效果越好

- `size`：整個測試資料集的樣本總數。

- `num_batches`：總共有幾個批次（batch）。

- `model.eval()`：切換成「**評估模式**」，停用訓練時的行為（例如 dropout、batchnorm 更新）。

- `test_loss`、`correct`：用來累積測試的結果。

### 關閉梯度計算

```
with torch.no_grad():
```

- 測試階段不需要訓練，也不需要反向傳播梯度。

- `torch.no_grad()` 可以節省記憶體與加快運算速度。

### 主要測試迴圈

```
for X, y in dataloader:
    X, y = X.to(device), y.to(device)
    pred = model(X)
    test_loss += loss_fn(pred, y).item()  # 累積每個 batch 的 loss
    correct += (pred.argmax(1) == y).type(torch.float).sum().item()
```

```
for X, y in dataloader:
    X, y = X.to(device), y.to(device)
    pred = model(X)
    test_loss += loss_fn(pred, y).item()  # 累積每個 batch 的 loss
    correct += (pred.argmax(1) == y).type(torch.float).sum().item()
```

### 詳細解釋：

| 步驟 | 說明 |
| --- | --- |
| `X, y = X.to(device), y.to(device)` | 將資料移到 GPU / CPU |
| `pred = model(X)` | 對測試資料做預測 |
| `loss_fn(pred, y)` | 計算這一批資料的損失值 |
| `.item()` | 取出純數值（從 tensor 轉成 float） |
| `pred.argmax(1)` | 取出每筆資料預測機率最高的類別 |
| `(pred.argmax(1) == y)` | 比對預測結果與真實標籤是否相同 |
| `.type(torch.float).sum().item()` | 計算這一批中預測正確的樣本數並加總 |

* * *

### 平均化結果與輸出

```
test_loss /= num_batches
correct /= size
print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f} \n")
```

```
test_loss /= num_batches
correct /= size
print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f} \n")
```

- `test_loss /= num_batches`：計算整體平均損失。

- `correct /= size`：計算整體準確率。

- `print()`：輸出測試結果。

```
epochs = 5
for t in range(epochs):
    print(f"Epoch {t+1}\n-------------------------------")
    train(train_dataloader, model, loss_fn, optimizer)
    test(test_dataloader, model, loss_fn)
print("Done!")
```

```
epochs = 5
for t in range(epochs):
    print(f"Epoch {t+1}\n-------------------------------")
    train(train_dataloader, model, loss_fn, optimizer)
    test(test_dataloader, model, loss_fn)
print("Done!")
```

以這個程式碼來說epochs是5，也就是訓練5次的意思。

## Saving Models

```
torch.save(model.state_dict(), "model.pth")
print("Saved PyTorch Model State to model.pth")
```

```
torch.save(model.state_dict(), "model.pth")
print("Saved PyTorch Model State to model.pth")
```

將模型的參數儲存到一個檔案 `"model.pth"` 中。

之後可以再繼續訓練或是使用。

## Loading Models

```
model = NeuralNetwork().to(device)
model.load_state_dict(torch.load("model.pth", weights_only=True))
```

```
model = NeuralNetwork().to(device)
model.load_state_dict(torch.load("model.pth", weights_only=True))
```

```
classes = [
    "T-shirt/top",
    "Trouser",
    "Pullover",
    "Dress",
    "Coat",
    "Sandal",
    "Shirt",
    "Sneaker",
    "Bag",
    "Ankle boot",
]
<div></div>
model.eval()
x, y = test_data[0][0], test_data[0][1]
with torch.no_grad():
    x = x.to(device)
    pred = model(x)
    predicted, actual = classes[pred[0].argmax(0)], classes[y]
    print(f'Predicted: "{predicted}", Actual: "{actual}"')
```

```
classes = [
    "T-shirt/top",
    "Trouser",
    "Pullover",
    "Dress",
    "Coat",
    "Sandal",
    "Shirt",
    "Sneaker",
    "Bag",
    "Ankle boot",
]

model.eval()
x, y = test_data[0][0], test_data[0][1]
with torch.no_grad():
    x = x.to(device)
    pred = model(x)
    predicted, actual = classes[pred[0].argmax(0)], classes[y]
    print(f'Predicted: "{predicted}", Actual: "{actual}"')
```

輸出結果 : Predicted: "Ankle boot", Actual: "Ankle boot"
