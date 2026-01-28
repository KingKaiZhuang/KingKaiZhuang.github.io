---
layout: post
title: Mac Docker 惡意軟體？
date: 2025-04-04
tags:
categories:
  - "docker"
top_img: /images/Docker.png
cover: /images/Docker.png
---

參考：[MacOS 將 Docker 檢測為惡意軟體問題](https://andywangtw.dev/post/macos-%E5%B0%87-docker-%E6%AA%A2%E6%B8%AC%E7%82%BA%E6%83%A1%E6%84%8F%E8%BB%9F%E9%AB%94%E5%95%8F%E9%A1%8C/)

* * *

## 🔧 修復`com.docker.vmnetd`問題

當你在 macOS 上啟動 Docker Desktop 時，可能會遇到如下錯誤訊息：

> 「未打開 'com.docker.vmnetd'，因為它包含惡意軟體。」

這是因為 macOS 的 Gatekeeper 誤判 Docker 的網路代理元件為惡意程式。以下步驟可以手動修復該問題，讓 Docker 能正常運作。

* * *

## 使用終端機手修復

### 📌 步驟一：刪除現有的 Helper Tools

打開「終端機」，輸入以下指令來移除出錯的元件：

```
sudo rm /Library/PrivilegedHelperTools/com.docker.vmnetdnsudo rm /Library/PrivilegedHelperTools/com.docker.socket
```

Bash

系統會要求你輸入密碼，請輸入你的 Mac 登入密碼（輸入時畫面不會顯示字元，屬正常現象）。

* * *

### 📌 步驟二：重新複製官方檔案

從 Docker Desktop 應用程式中，重新將正確的 `com.docker.vmnetd` 複製回系統目錄：

```
sudo cp /Applications/Docker.app/Contents/Library/LaunchServices/com.docker.vmnetd /Library/PrivilegedHelperTools/
```

Bash
