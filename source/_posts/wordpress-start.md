---
layout: post
title: WordPress 架站與伺服器設定教學紀錄
date: 2025-03-31
tags:
categories:
  - "vm-setting"
  - "wordpress"
top_img: /images/64b6bd08-e4f1-4125-aba5-2886b5bc938a.webp
cover: /images/64b6bd08-e4f1-4125-aba5-2886b5bc938a.webp
---

## 【一、執行環境設定】

- 使用主機：雲端主機（如 Linode）

- 套件：啟用自動備份功能（如 Linode Backup）

- 作業系統：Ubuntu 24.04 LTS

- SSH Port：預設為 Port 22

- Fail2Ban：已啟用，保護 SSH 登入

- UFW 防火牆狀態： `443/tcp ALLOW 80/tcp ALLOW 22/tcp DENY`

![](/images/image-1.png)

* * *

## 【二、Nginx + PHP + MariaDB 設定】

- **Nginx**：安裝並啟用

- **PHP**：8.3（以 php-fpm 模式運作）

- **MariaDB**：
    - 資料庫名稱：`wp_project`
    
    - 使用者帳號：`wpuser`
    
    - 密碼：自訂（建議設定複雜密碼）

![](/images/image-2.png)

* * *

## 【三、安裝與設定 WordPress】

- 部署路徑：`/var/www/yourdomain.com`

- 安裝 WordPress 核心檔案

- 設定 `wp-config.php`：

- `define('DB_NAME', 'wp_project');`

- `define('DB_USER', 'wpuser');`

- `define('DB_PASSWORD', 'your_password');`

- `define('WP_HOME', 'https://yourdomain.com');`

- `define('WP_SITEURL', 'https://yourdomain.com');`

* * *

## 【四、SSL 憑證與 HTTPS 設定】

- 網域：`yourdomain.com`、`www.yourdomain.com`

- 工具：Certbot + Let's Encrypt

- 狀態：
    - 憑證申請成功
    
    - 自動續期任務已設定
    
    - 測試續期（dry-run）成功

* * *

## 【五、DNS 設定】

- 網域註冊商：如 Gandi、Namecheap、Google Domains

- DNS 記錄範例：
    - `A @ your.server.ip.address`
    
    - `A www your.server.ip.address`

- CDN/防護：已啟用 Cloudflare（Full SSL 模式）

- DNS 記錄更新後，重新啟用 Certbot 以確保憑證綁定正確

* * *

## 【六、佈署 WordPress 主題與外掛】

- 主題與外掛來源：Git 平台（如 GitHub、Bitbucket）

- 佈署位置：`/opt/wp-deploy/`

- 佈署工具腳本：`deploy.sh`
    - 功能：支援多主題／多外掛佈署、pull 更新、變更檔案權限
    
    - 建議將佈署流程整合進 Git 操作中以利更新

![](/images/image-3.png)

* * *

## 【七、安全性與效能設定】

- **Wordfence**：安裝防護外掛並啟用 2FA 雙重驗證

- **WP Rocket**：安裝快取外掛，配合 Cloudflare 使用（避免設定衝突）

- **Fail2Ban**：SSH 攻擊防禦已啟用（jail 有運作紀錄）

- **Certbot**：憑證自動續期已確認正常運作

- **Cloudflare 整合**：確保資源快取與 HTTPS 模式設定一致

* * *

## 【八、常用伺服器管理指令】

| 功能 | 指令 |
| --- | --- |
| 重啟 Nginx | `sudo systemctl restart nginx` |
| 重啟 PHP-FPM | `sudo systemctl restart php8.3-fpm` |
| 查看 Nginx 錯誤日誌 | `sudo tail -n 100 /var/log/nginx/error.log` |
| 執行佈署腳本(個人撰寫指令) | `/opt/wp-deploy/deploy.sh` |
| 查看 WordPress debug | `sudo tail -n 100 /var/www/yourdomain.com/wp-content/debug.log` |
| 測試 SSL 自動續期 | `sudo certbot renew --dry-run` |
| 查看防火牆狀態 | `sudo ufw status` |
