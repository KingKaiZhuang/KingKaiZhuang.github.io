---
layout: post
title: 本地專案推送至Bitbucket遠端存放庫
date: 2024-09-22 12:47:29
tags:
  - "Bitbucket"
categories:
  - "遠端存放庫"
  - "Bitbucket"
top_img: "https://www.interviewbit.com/blog/wp-content/uploads/2021/10/What-is-Bitbucket-550x413.jpeg"
cover: "https://www.interviewbit.com/blog/wp-content/uploads/2021/10/What-is-Bitbucket-550x413.jpeg"
---

我的工作常常會使用到 bitbucket 遠端存放庫，前幾次使用不是很熟悉，因此我將步驟記錄下來讓我對 git 語法更熟悉：

````markdown
# 將本地專案推送到 Bitbucket 的教學文案

本文介紹了如何將本地的 Git 專案推送到 Bitbucket，包括每個步驟執行指令後的顯示內容。

---

## 步驟 1: 初始化本地 Git 儲存庫

如果尚未初始化 Git 儲存庫，首先進入專案目錄並執行以下命令：

```bash
git init
```
````

### 顯示內容

```bash
Initialized empty Git repository in /Users/zhuang/iavogue/.git/
```

---

## 步驟 2: 新增 Bitbucket 遠端倉庫

將 Bitbucket 的儲存庫 URL 新增到本地專案的 Git 遠端倉庫列表中：

```bash
git remote add origin git@bitbucket.org:iambigd/wp-iavogue.git
```

檢查遠端倉庫是否正確添加：

```bash
bash
git remote -v
```

### 顯示內容

```bash
origin  git@bitbucket.org:iambigd/wp-iavogue.git (fetch)
origin  git@bitbucket.org:iambigd/wp-iavogue.git (push)
```

---

## 步驟 3: 添加專案檔案到暫存區

將本地專案中的檔案添加到 Git 暫存區中，準備提交變更：

```bash
git add .
```

檢查添加的檔案：

```bash
git status
```

### 顯示內容

```bash
On branch main
Your branch is up-to-date with 'origin/main'.
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

	new file:   index.html
	new file:   styles.css
```

---

## 步驟 4: 提交變更

提交這些檔案並附上提交訊息：

```bash
git commit -m "第一次提交"
```

### 顯示內容

```bash
[main (root-commit) fd4c3c0] 第一次提交
 2 files changed, 190 insertions(+)
 create mode 100644 index.html
 create mode 100644 styles.css
```

---

## 步驟 5: 推送到遠端 Bitbucket 儲存庫

嘗試將本地專案推送到遠端儲存庫：

```bash
git push -u origin main
```

### 顯示內容（成功時）

```bash
枚舉物件: 72, 完成.
物件計數中: 100% (72/72), 完成.
使用 8 個執行緒進行壓縮
壓縮物件中: 100% (66/66), 完成.
寫入物件中: 100% (71/71), 1.70 MiB | 27.14 MiB/s, 完成.
總共 71 (差異 0)，復用 0 (差異 0)，重用包 0 (總共 0)
To bitbucket.org:iambigd/wp-iavogue.git
   145a286..9a1623a  main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 常見問題：推送被拒絕 (non-fast-forward)

### 顯示內容

```bash
! [rejected]        main -> main (non-fast-forward)
錯誤: 推送一些引用到 'bitbucket.org:iambigd/wp-iavogue.git' 失敗
提示： 更新被拒絕，因為您目前分支的最新提交落後於其對應的遠端分支。
```

### 解決方案

拉取遠端的變更並重新推送：

```bash
git pull origin main --rebase
git push origin main
```

### 顯示內容

```bash
來自 bitbucket.org:iambigd/wp-iavogue
 * branch            main       -> FETCH_HEAD
成功重定基底並更新 refs/heads/main。

枚舉物件: 72, 完成.
物件計數中: 100% (72/72), 完成.
使用 8 個執行緒進行壓縮
壓縮物件中: 100% (66/66), 完成.
寫入物件中: 100% (71/71), 1.70 MiB | 27.14 MiB/s, 完成.
總共 71 (差異 0)，復用 0 (差異 0)，重用包 0 (總共 0)
To bitbucket.org:iambigd/wp-iavogue.git
   145a286..9a1623a  main -> main
```

---

## 強制推送（如需要）

如果你不在意遠端歷史，或者希望覆蓋遠端的變更，你可以使用 `--force` 強制推送：

```bash
git push -f origin main
```

---
