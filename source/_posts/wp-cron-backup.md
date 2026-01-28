---
layout: post
title: WordPress 網站利用 Cron + Rclone 自動同步檔案到 Google Drive 完整教學
date: 2025-11-14
tags:
  - "wordpress-備份"
categories:
  - "vm-setting"
  - "wordpress"
top_img: /images/Gemini_Generated_Image_hqxfm7hqxfm7hqxf.png
cover: /images/Gemini_Generated_Image_hqxfm7hqxfm7hqxf.png
---

`首先將示範你如何在 Ubuntu 上安裝 rclone、建立 Google Drive remote，最後撰寫Shell Script。`

## 安裝 rclone

```
sudo apt install rclone -y
```

```
sudo apt install rclone -y
```

  
代表的意思：

- `sudo`：以管理員權限執行。

- `apt install rclone`：從套件庫安裝 rclone。

- `-y`：自動同意所有安裝提示，不需要手動按 Yes。

安裝完後 Ubuntu 會輸出一堆像是 Database、man-db、kernel upgrade 的提示，這些是系統正常的安裝訊息，與 rclone 本體無關。

## 開始設定 rclone

```
rclone config
```

```
rclone config
```

這會啟動互動式設定介面，讓你建立 remote。

## 建立新 remote

畫面問：

```
n) New remote
s) Set configuration password
q) Quit config
n/s/q>
```

```
n) New remote
s) Set configuration password
q) Quit config
n/s/q>
```

你輸入：n

代表「建立新的 remote」。

## 設定 remote 名稱

畫面問：

Enter name for new remote.  
name>

輸入：gdrive

意思是：你把這個 rclone 連線命名成 gdrive，之後所有操作都可以用 `gdrive:` 指向你的 Google Drive。

## 選擇儲存服務類型

畫面列出一大串支援的雲端，並問：

```
sudo apt install rclone -y
```

```
sudo apt install rclone -y
```

你輸入：18

代表選擇「Google Drive」。

## client\_id 與 client\_secret

畫面問：

```
client_id>
client_secret>
```

直接按 Enter 留空。

代表：

- rclone 會使用官方內建的 Google OAuth client

- 好處是簡單

- 壞處是流量被限縮，不適合大量搬資料

- 不過你的用途是備份用，留空也可以正常運作

## scope 權限設定

畫面問：

```
Option scope.
Scope that rclone should use when requesting access from drive.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
 1 / Full access all files, excluding Application Data Folder.
   \ (drive)
 2 / Read-only access to file metadata and file contents.
   \ (drive.readonly)
   / Access to files created by rclone only.
 3 | These are visible in the drive website.
   | File authorization is revoked when the user deauthorizes the app.
   \ (drive.file)
   / Allows read and write access to the Application Data folder.
 4 | This is not visible in the drive website.
   \ (drive.appfolder)
   / Allows read-only access to file metadata but
 5 | does not allow any access to read or download file content.
   \ (drive.metadata.readonly)
scope> 1
```

```
Option scope.
Scope that rclone should use when requesting access from drive.
Choose a number from below, or type in your own value.
Press Enter to leave empty.
 1 / Full access all files, excluding Application Data Folder.
   \ (drive)
 2 / Read-only access to file metadata and file contents.
   \ (drive.readonly)
   / Access to files created by rclone only.
 3 | These are visible in the drive website.
   | File authorization is revoked when the user deauthorizes the app.
   \ (drive.file)
   / Allows read and write access to the Application Data folder.
 4 | This is not visible in the drive website.
   \ (drive.appfolder)
   / Allows read-only access to file metadata but
 5 | does not allow any access to read or download file content.
   \ (drive.metadata.readonly)
scope> 1
```

輸入：1

代表使用：

```
Full access all files, excluding Application Data Folder.
```

意思是：  
rclone 可以對你的 Google Drive 執行讀寫與管理檔案，這是最完整的權限。

## service\_account\_file

畫面問：service\_account\_file>

直接按Enter。代表你不用 Service Account，也不需要 JSON 憑證，而是使用一般 OAuth 流程登入。

## advanced config

畫面問：Edit advanced config? y/n>

你輸入：n

代表採用預設值，不進階調整。

## 是否使用 auto-config

畫面問：Use auto config? y/n>

你輸入：n

原因：你是在沒有 GUI 的遠端主機上操作，所以不能自動跳出瀏覽器登入。

## 手動給 token (你的瀏覽器機器產出的)

```
Option config_token.
For this to work, you will need rclone available on a machine that has
a web browser available.
For more help and alternate methods see: https://rclone.org/remote_setup/
Execute the following on the machine with the web browser (same rclone
version recommended):
        rclone authorize "drive" "授權碼"
Then paste the result.
Enter a value.
config_token>
```

```
Option config_token.
For this to work, you will need rclone available on a machine that has
a web browser available.
For more help and alternate methods see: https://rclone.org/remote_setup/
Execute the following on the machine with the web browser (same rclone
version recommended):
        rclone authorize "drive" "授權碼"
Then paste the result.
Enter a value.
config_token>
```

畫面問：config\_token>

在任何有瀏覽器的電腦開 Terminal

輸入：

```
rclone authorize "drive" "<授權碼>"
```

```
rclone authorize "drive" "<授權碼>"
```

![](/images/image-2-1024x510.png)

這一步代表：你透過另一台有網頁瀏覽器的機器完成 Google OAuth 登入，再把結果回傳到伺服器。

## Shared Drive 是否要設定

畫面問：Configure this as a Shared Drive? y/n>

你輸入：y

代表問 Google Drive 是否有 Team Drive。  
你沒有 Team Drive，所以顯示：No Shared Drives found

## 完成設定並儲存

最後 rclone 問：Keep this "gdrive" remote?

你輸入：y

設定就正式完成。

## 測試 remote 是否正常

你輸入：

```
rclone ls gdrive:
```

```
rclone ls gdrive:
```

重點是要加冒號。執行後，你看到 Google Drive 裡全部的檔案列表。代表 gdrive remote 設定成功。

![](/images/image-3-1024x526.png)

# 接著是 Shell Script 與 cron 排程設定

本備份系統用於在 Linux 伺服器上自動備份多個 WordPress 網站，包括：

- 資料庫備份

- WordPress 主程式備份（排除 uploads）

- Uploads 獨立備份

- 上傳至 Google Drive

- 本機不保留備份檔案

- 由單一設定檔管理多個網站

備份工具：

- mysqldump

- tar

- rclone (Google Drive 備份上傳)

- cron (排程)

## 備份資料夾結構

將建立以下結構：

```
/root/backup/
 ├── config/
 │     └── sites.conf
 └── scripts/
       ├── backup-all.sh
       └── backup-uploads.sh
```

```
/root/backup/
 ├── config/
 │     └── sites.conf
 └── scripts/
       ├── backup-all.sh
       └── backup-uploads.sh
```

## 建立系統目錄

```
sudo mkdir -p /root/backup/config
sudo mkdir -p /root/backup/scripts
```

```
sudo mkdir -p /root/backup/config
sudo mkdir -p /root/backup/scripts
```

## 設定檔 sites.conf

所有網站資訊集中管理於：

```
/root/backup/config/sites.conf
```

```
/root/backup/config/sites.conf
```

格式如下：

```
# SITE_NAME | DB_NAME | DB_USER | DB_PASS | WP_PATH
<div></div>
stackpenguin|網頁對應的資料庫|資料庫使用者|密碼|網頁路徑
```

```
# SITE_NAME | DB_NAME | DB_USER | DB_PASS | WP_PATH

stackpenguin|網頁對應的資料庫|資料庫使用者|密碼|網頁路徑
```

若有多個站點，每行新增一筆資料即可。

## Script：備份資料庫與 WordPress 主程式

檔案位置：

```
/root/backup/scripts/backup-all.sh
```

```
/root/backup/scripts/backup-all.sh
```

內容如下：

```
#!/bin/bash
<div></div>
CONFIG="/root/backup/config/sites.conf"
DATE=$(date +"%Y-%m-%d-%H%M")
REMOTE="gdrive"
REMOTE_BASE="wordpress-backups"
<div></div>
while IFS='|' read -r SITE DB_NAME DB_USER DB_PASS WP_PATH
do
    # 跳過空行與註解行
    [[ -z "$SITE" || "$SITE" =~ ^# ]] && continue
<div></div>
    echo "====================================="
    echo "開始備份：$SITE（DB + 主程式）"
    echo "====================================="
<div></div>
    TMP_DIR="/tmp/wp-backup-${SITE}-${DATE}"
    mkdir -p "$TMP_DIR"
<div></div>
    #######################################
    # 1. 備份資料庫（.sql）
    #######################################
    DB_FILE="$TMP_DIR/db-${SITE}-${DATE}.sql"
<div></div>
    echo "➤ 備份資料庫中…"
    mysqldump --single-transaction --quick --skip-lock-tables \
        -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$DB_FILE"
<div></div>
    echo "➤ 上傳資料庫…（含進度）"
    rclone copy "$DB_FILE" "${REMOTE}:/${REMOTE_BASE}/${SITE}/db/" -P
<div></div>
    echo "➤ 清除舊版資料庫備份…（保留最新 2 份）"
    rclone ls "${REMOTE}:/${REMOTE_BASE}/${SITE}/db/" \
        | sort -k2 \
        | head -n -2 \
        | awk '{print $2}' \
        | while read OLD_FILE
    do
        echo "刪除：$OLD_FILE"
        rclone delete "${REMOTE}:/${REMOTE_BASE}/${SITE}/db/${OLD_FILE}"
    done
<div></div>
    #######################################
    # 2. 備份主程式（排除 uploads）
    #######################################
    WP_FILE="$TMP_DIR/wp-${SITE}-${DATE}.tar.gz"
<div></div>
    echo "➤ 壓縮 WordPress 主程式…（不含 uploads）"
    tar -czf "$WP_FILE" \
        --exclude="${WP_PATH}/wp-content/uploads" \
        "$WP_PATH"
<div></div>
    echo "➤ 上傳主程式…（含進度）"
    rclone copy "$WP_FILE" "${REMOTE}:/${REMOTE_BASE}/${SITE}/main/" -P
<div></div>
    echo "➤ 清除舊版主程式備份…（保留最新 2 份）"
    rclone ls "${REMOTE}:/${REMOTE_BASE}/${SITE}/main/" \
        | sort -k2 \
        | head -n -2 \
        | awk '{print $2}' \
        | while read OLD_FILE
    do
        echo "刪除：$OLD_FILE"
        rclone delete "${REMOTE}:/${REMOTE_BASE}/${SITE}/main/${OLD_FILE}"
    done
<div></div>
    #######################################
    # 3. 清除暫存
    #######################################
    rm -rf "$TMP_DIR"
<div></div>
    echo "=== ${SITE} 主程式與資料庫備份完成 ==="
    echo ""
<div></div>
done < "$CONFIG"
<div></div>
echo "全部網站的 DB + 主程式備份已完成"
```

```
#!/bin/bash

CONFIG="/root/backup/config/sites.conf"
DATE=$(date +"%Y-%m-%d-%H%M")
REMOTE="gdrive"
REMOTE_BASE="wordpress-backups"

while IFS='|' read -r SITE DB_NAME DB_USER DB_PASS WP_PATH
do
    # 跳過空行與註解行
    [[ -z "$SITE" || "$SITE" =~ ^# ]] && continue

    echo "====================================="
    echo "開始備份：$SITE（DB + 主程式）"
    echo "====================================="

    TMP_DIR="/tmp/wp-backup-${SITE}-${DATE}"
    mkdir -p "$TMP_DIR"

    #######################################
    # 1. 備份資料庫（.sql）
    #######################################
    DB_FILE="$TMP_DIR/db-${SITE}-${DATE}.sql"

    echo "➤ 備份資料庫中…"
    mysqldump --single-transaction --quick --skip-lock-tables \
        -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$DB_FILE"

    echo "➤ 上傳資料庫…（含進度）"
    rclone copy "$DB_FILE" "${REMOTE}:/${REMOTE_BASE}/${SITE}/db/" -P

    echo "➤ 清除舊版資料庫備份…（保留最新 2 份）"
    rclone ls "${REMOTE}:/${REMOTE_BASE}/${SITE}/db/" \
        | sort -k2 \
        | head -n -2 \
        | awk '{print $2}' \
        | while read OLD_FILE
    do
        echo "刪除：$OLD_FILE"
        rclone delete "${REMOTE}:/${REMOTE_BASE}/${SITE}/db/${OLD_FILE}"
    done

    #######################################
    # 2. 備份主程式（排除 uploads）
    #######################################
    WP_FILE="$TMP_DIR/wp-${SITE}-${DATE}.tar.gz"

    echo "➤ 壓縮 WordPress 主程式…（不含 uploads）"
    tar -czf "$WP_FILE" \
        --exclude="${WP_PATH}/wp-content/uploads" \
        "$WP_PATH"

    echo "➤ 上傳主程式…（含進度）"
    rclone copy "$WP_FILE" "${REMOTE}:/${REMOTE_BASE}/${SITE}/main/" -P

    echo "➤ 清除舊版主程式備份…（保留最新 2 份）"
    rclone ls "${REMOTE}:/${REMOTE_BASE}/${SITE}/main/" \
        | sort -k2 \
        | head -n -2 \
        | awk '{print $2}' \
        | while read OLD_FILE
    do
        echo "刪除：$OLD_FILE"
        rclone delete "${REMOTE}:/${REMOTE_BASE}/${SITE}/main/${OLD_FILE}"
    done

    #######################################
    # 3. 清除暫存
    #######################################
    rm -rf "$TMP_DIR"

    echo "=== ${SITE} 主程式與資料庫備份完成 ==="
    echo ""

done < "$CONFIG"

echo "全部網站的 DB + 主程式備份已完成"
```

## Script：備份 uploads

檔案位置：

```
/root/backup/scripts/backup-uploads.sh
```

```
/root/backup/scripts/backup-uploads.sh
```

內容如下：

```
#!/bin/bash
<div></div>
CONFIG="/root/backup/config/sites.conf"
DATE=$(date +"%Y-%m-%d-%H%M")
<div></div>
REMOTE="gdrive"
REMOTE_BASE="wordpress-backups"
<div></div>
while IFS='|' read -r SITE DB_NAME DB_USER DB_PASS WP_PATH
do
    # 跳過空行與註解
    [[ -z "$SITE" || "$SITE" =~ ^# ]] && continue
<div></div>
    UPLOAD_PATH="${WP_PATH}/wp-content/uploads"
<div></div>
    echo "==============================="
    echo "開始備份 uploads：${SITE}"
    echo "==============================="
<div></div>
    TMP_DIR="/tmp/wp-uploads-${SITE}-${DATE}"
    mkdir -p "$TMP_DIR"
<div></div>
    UPLOAD_FILE="${TMP_DIR}/uploads-${SITE}-${DATE}.tar.gz"
<div></div>
    # 壓縮 uploads
    tar -czf "$UPLOAD_FILE" "$UPLOAD_PATH"
<div></div>
    # 上傳至 Google Drive
    rclone copy "$TMP_DIR" "${REMOTE}:/${REMOTE_BASE}/${SITE}/uploads/"
<div></div>
    # 刪除暫存資料
    rm -rf "$TMP_DIR"
<div></div>
    echo "=== ${SITE} uploads 備份完成 ==="
    echo ""
done < "$CONFIG"
<div></div>
echo "所有網站 uploads 備份完成"
```

```
#!/bin/bash

CONFIG="/root/backup/config/sites.conf"
DATE=$(date +"%Y-%m-%d-%H%M")

REMOTE="gdrive"
REMOTE_BASE="wordpress-backups"

while IFS='|' read -r SITE DB_NAME DB_USER DB_PASS WP_PATH
do
    # 跳過空行與註解
    [[ -z "$SITE" || "$SITE" =~ ^# ]] && continue

    UPLOAD_PATH="${WP_PATH}/wp-content/uploads"

    echo "==============================="
    echo "開始備份 uploads：${SITE}"
    echo "==============================="

    TMP_DIR="/tmp/wp-uploads-${SITE}-${DATE}"
    mkdir -p "$TMP_DIR"

    UPLOAD_FILE="${TMP_DIR}/uploads-${SITE}-${DATE}.tar.gz"

    # 壓縮 uploads
    tar -czf "$UPLOAD_FILE" "$UPLOAD_PATH"

    # 上傳至 Google Drive
    rclone copy "$TMP_DIR" "${REMOTE}:/${REMOTE_BASE}/${SITE}/uploads/"

    # 刪除暫存資料
    rm -rf "$TMP_DIR"

    echo "=== ${SITE} uploads 備份完成 ==="
    echo ""
done < "$CONFIG"

echo "所有網站 uploads 備份完成"
```

## Script 權限設

```
sudo chmod +x /root/backup/scripts/backup-all.sh<br>sudo chmod +x /root/backup/scripts/backup-uploads.sh
```

```
sudo chmod +x /root/backup/scripts/backup-all.sh<br>sudo chmod +x /root/backup/scripts/backup-uploads.sh
```

## 排程 cron 設定

設定 root cron：

```
sudo crontab -e
```

```
sudo crontab -e
```

加入：

```
# 每日凌晨 3 點：DB + 主程式備份
0 3 * * * /root/backup/scripts/backup-all.sh >/dev/null 2>&1
<div></div>
# 每週一凌晨 4 點：uploads 備份
0 4 * * 1 /root/backup/scripts/backup-uploads.sh >/dev/null 2>&1
```

```
# 每日凌晨 3 點：DB + 主程式備份
0 3 * * * /root/backup/scripts/backup-all.sh >/dev/null 2>&1

# 每週一凌晨 4 點：uploads 備份
0 4 * * 1 /root/backup/scripts/backup-uploads.sh >/dev/null 2>&1
```

## 測試備份流程

### 測試 DB + 主程式

```
sudo /root/backup/scripts/backup-all.sh
```

```
sudo /root/backup/scripts/backup-all.sh
```

### 測試 uploads

```
sudo /root/backup/scripts/backup-uploads.sh
```

```
sudo /root/backup/scripts/backup-uploads.sh
```

## 備份位置

備份檔案將會出現在 Google Drive：

![](/images/CleanShot-2025-11-14-at-18.10.07@2x-1024x482.png)

![](/images/CleanShot-2025-11-15-at-15.00.18-1024x611.png)

![](/images/CleanShot-2025-11-15-at-15.00.44-1024x611.png)

![](/images/CleanShot-2025-11-15-at-15.01.04-1024x611.png)

## 注意事項

1. rclone remote 名稱必須為 gdrive，若不同需修改 script。

3. 需要確保 WordPress 資料庫使用者具備 PROCESS 權限： `GRANT PROCESS ON *.* TO 'zhuangwp'@'localhost'; FLUSH PRIVILEGES;`

5. 若新增網站，只需在 sites.conf 新增一行即可。

7. 本機不會保留任何備份檔案，全部在 /tmp 完成後會刪除。

我也試了備份的檔案能夠在本地恢復，可以閱讀這一篇。

https://cms.stackpenguin.com/2025/11/15/wp-restore-local/
