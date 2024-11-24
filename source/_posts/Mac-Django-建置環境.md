---
layout: post
title: Mac Django 建置環境
date: 2024-10-01 13:43:31
tags: [Python Django]
categories: [Python, Django]
top_img: https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FDjango%2Fdjango%20logo.jpeg?alt=media&token=8bc6ff88-240d-4df6-af8f-3e33bf72140f
cover: https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FDjango%2Fdjango%20logo.jpeg?alt=media&token=8bc6ff88-240d-4df6-af8f-3e33bf72140f
---

### **macOS 上下載並安裝 Django 教學指南（不使用虛擬環境，並加入 PATH 教學）**

#### **步驟 1：確認安裝 Homebrew（可選）**

如果你還沒有安裝 Homebrew，可以按照以下指令來安裝。Homebrew 是 macOS 上的包管理器，方便你安裝和管理軟件：

1. 打開「終端機」(Terminal)，輸入以下指令來安裝 Homebrew：
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. 等待 Homebrew 安裝完成，然後更新 Homebrew：
   ```bash
   brew update
   ```

#### **步驟 2：安裝 Python 3**

1. 確認是否已安裝 Python 3：
   ```bash
   python3 --version
   ```
   如果沒有安裝或版本過舊，可以使用 Homebrew 安裝最新的 Python 3：
   ```bash
   brew install python3
   ```

#### **步驟 3：安裝 Django**

1. 確保 Python 3 已經安裝，然後使用 `pip3` 安裝 Django：

   ```bash
   pip3 install django
   ```

2. 安裝完成後，檢查 Django 是否已安裝成功：
   ```bash
   django-admin --version
   ```
   如果指令執行成功，會顯示 Django 的版本號，例如 `4.2.16`。

#### **步驟 4：創建 Django 專案**

1. 使用 `django-admin` 創建一個新專案。首先，進入你想要創建專案的目錄，然後執行以下指令：

   ```bash
   django-admin startproject <project-name>
   ```

   例如：

   ```bash
   django-admin startproject mysite
   ```

2. 進入專案目錄並運行開發伺服器：
   ```bash
   cd mysite
   python3 manage.py runserver
   ```
   終端應顯示伺服器正在 `http://127.0.0.1:8000/` 運行。打開瀏覽器並輸入這個地址來查看 Django 的初始畫面。

#### **步驟 5：解決常見錯誤**

##### **`django-admin: command not found` 問題解決**

如果安裝 Django 後出現 `django-admin: command not found` 錯誤，這可能是因為 Python 的執行檔沒有在系統的 PATH 中。請依照以下步驟來手動加入 PATH：

1. 找到 `django-admin` 安裝路徑。根據你之前提供的資訊，Django 安裝在以下路徑：

   ```
   /Users/zhuang/Library/Python/3.9/bin
   ```

2. 在終端機中暫時添加此路徑到 PATH：

   ```bash
   export PATH="$PATH:/Users/zhuang/Library/Python/3.9/bin"
   ```

3. 要使這個變更永久生效，打開或編輯 `~/.zshrc` 檔案，並將以下內容添加到檔案末尾：

   ```bash
   export PATH="$PATH:/Users/zhuang/Library/Python/3.9/bin"
   ```

4. 保存檔案後，執行以下指令來使變更生效：

   ```bash
   source ~/.zshrc
   ```

5. 完成後，檢查是否可以正常使用 `django-admin`：
   ```bash
   django-admin --version
   ```

#### **總結**

這樣你就能在 macOS 上成功下載、安裝並配置 Django，並解決了 PATH 相關的問題。
