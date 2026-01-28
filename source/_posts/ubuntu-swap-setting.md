---
layout: post
title: Ubuntu 新增 4GB Swap 教學文件
date: 2025-11-13
tags:
categories:
  - "ubuntu"
  - "vm-setting"
top_img: /images/ubuntu-swap.png
cover: /images/ubuntu-swap.png
---

以下為在 Ubuntu 24.04 主機上新增 4GB swap 的完整操作流程與解說，包含你實際執行的指令整理後的教學。

## 📌 1. 查看磁碟使用狀況

在新增 swap 前，先確認磁碟空間是否足夠：

```
df -h
```

```
df -h
```

範例輸出：

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda         25G   13G   11G  56% /
```

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda         25G   13G   11G  56% /
```

可見有 11GB 可用空間，足以建立新的 4GB swapfile。

## 📌 2. 建立 4GB Swap File

使用 `fallocate` 建立一個大小為 4GB 的 swap 檔案：

```
sudo fallocate -l 4G /swapfile2
```

```
sudo fallocate -l 4G /swapfile2
```

## 📌 3. 設定 Swap 檔案權限

Swap file 必須設定成只有 root 能讀寫，否則系統會拒絕使用：

```
sudo chmod 600 /swapfile2
```

```
sudo chmod 600 /swapfile2
```

## 📘 額外補充：Linux 權限教學（給完全不懂的人）

為了更容易理解，我用超白話方式說明：

### 🔹 什麼是 Linux 權限？

Linux 裡每個檔案與資料夾都有三種「身分」能對它做事：

- **User（u）**：檔案的擁有者

- **Group（g）**：與該檔案同群組的人

- **Others（o）**：所有其他人（包含陌生人）

每個身分都可以有三種權限：

- **r = read（讀）**

- **w = write（寫）**

- **x = execute（執行）**

### 🔹 數字是怎麼來的？

Linux 會用一個「三位數」表示權限，例如：

chmod 600 file

代表：

- 第一個數字（6）→ user 的權限

- 第二個數字（0）→ group 的權限

- 第三個數字（0）→ others 的權限

那 6、0、0 是什麼意思？

權限對應如下：

- r = 4

- w = 2

- x = 1

所以：

- **6 = 4 + 2 = rw-（讀寫可）**

- **0 = ---（完全沒權限）**

### 🔹 用表格讓你秒懂

| 數字 | 權限 | 意思 |
| --- | --- | --- |
| 7 | rwx | 讀寫執行全部可 |
| 6 | rw- | 讀 + 寫 |
| 5 | r-x | 讀 + 執行 |
| 4 | r-- | 只有讀 |
| 0 | \--- | 什麼都不行 |

### 🔹 swapfile 為什麼不能設 644 或 777？

- 644 = 其他人能讀 → **完全不行**

- 666 = 其他人能寫 → **大爆炸級資安問題**

- 777 = 人人可讀寫執行 → **不要命了**

因為 swapfile 裡可能包含：

- 密碼明文

- MySQL 的資料

- 後台 session

- 記憶體裡任何曾存在過的資料

所以必須限制成：

600（rw-------）

這樣才能確保：

- root 可以使用

- 其他任何人都不能讀寫

- 系統才能安全掛載 swapfile

## 📌 4. 將檔案格式化成 Swap 空間

將剛建立的檔案轉成 swap 格式：

```
sudo mkswap /swapfile2
```

```
sudo mkswap /swapfile2
```

執行後會看到類似：

```
Setting up swapspace version 1, size = 4 GiB<br>UUID=xxxxx-xxxxx
```

```
Setting up swapspace version 1, size = 4 GiB<br>UUID=xxxxx-xxxxx
```

## 📌 5. 啟用 Swap File

讓 swapfile 立即生效：

```
sudo swapon /swapfile2
```

```
sudo swapon /swapfile2
```

## 📌 6. 設定開機自動啟用 Swap

把設定寫入 `/etc/fstab`：

```
echo '/swapfile2 none swap sw 0 0' | sudo tee -a /etc/fstab
```

```
echo '/swapfile2 none swap sw 0 0' | sudo tee -a /etc/fstab
```

## 📌 7. 確認 Swap 是否成功新增

使用 `free -h` 查看目前的記憶體與 swap 狀態：

```
free -h
```

```
free -h
```

範例輸出：

               ```
               total        used        free      shared  buff/cache   available
Mem:           961Mi       873Mi        79Mi        71Mi       221Mi        88Mi
Swap:          4.5Gi       520Mi       4.0Gi
```

```
               total        used        free      shared  buff/cache   available
Mem:           961Mi       873Mi        79Mi        71Mi       221Mi        88Mi
Swap:          4.5Gi       520Mi       4.0Gi
```

可以看到：

- 原本的 512MB swap + 新增的 4GB → **總共 4.5GB swap**

- 系統已成功使用新的 swap。
