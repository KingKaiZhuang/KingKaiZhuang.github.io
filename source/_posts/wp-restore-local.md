---
layout: post
title: 如何用雲端備份在本地 Local 重建 WordPress
date: 2025-11-15
tags:
categories:
  - "wordpress"
top_img: /images/Gemini_Generated_Image_vfctf8vfctf8vfct.png
cover: /images/Gemini_Generated_Image_vfctf8vfctf8vfct.png
---

閱讀這篇文章之前，必須先操作上一篇文章的內容。

[https://stackpenguin.com/blog/wp-cron-backup](https://stackpenguin.com/blog/wp-cron-backup)

我在我的macbook筆電建立一個Local的測試機名字取為BackupReview。

本文章的目的是將我的Linode主機備份後的WordPress檔案，匯入到本地端做測試。

廢話不多說馬上開始吧！

## 下載備份檔案

![](/images/CleanShot-2025-11-14-at-18.10.07@2x-1024x482.png)

db資料庫的.sql檔案。

main的話是wp-content所有內容。

uploads包含圖片與檔案，或是其他外掛的檔案內容都在這裡。

這三個內容只要缺一個，就沒辦法完整復原。

## 建立測試機

![](/images/CleanShot-2025-11-15-at-11.44.53@2x-1024x632.png)

先看一下有沒有成功跑起來，看來是有。

接下來要開始復原我的網頁到本地端。

![](/images/CleanShot-2025-11-15-at-12.02.52-1024x611.png)

## 匯入資料庫

來到Database這邊，按下Open AdminNeo就會打開資料庫介面。

![](/images/CleanShot-2025-11-15-at-12.09.41@2x-1024x632.png)

進到資料庫頁面點擊 Local Site: BackupReview 跳轉到資料庫首頁。

![](/images/CleanShot-2025-11-15-at-12.17.01-1024x611.png)

建立資料庫，對應你網站的資料庫名稱，我的是wp\_zhuangblog。

記得要改成自己的。

![](/images/CleanShot-2025-11-15-at-12.20.47-1024x228.png)

創建完成後要匯入備份的sql檔案。

![](/images/CleanShot-2025-11-15-at-12.21.44-1024x277.png)

執行後會顯示成功匯入，並在左側顯示所有資料表。

![](/images/CleanShot-2025-11-15-at-12.23.00-1024x611.png)

## Local sites 檔案設定

首先回到Local頁面，按下Site folder會進直接跳進你的網頁資料夾．

![](/images/CleanShot-2025-11-15-at-12.24.17@2x-1024x632.png)

將public裡面的所有檔案都先刪除，因為要把備份的轉進來。

![](/images/CleanShot-2025-11-15-at-12.28.08@2x-1024x599.png)

![](/images/CleanShot-2025-11-15-at-12.29.00@2x-1024x599.png)

接著去你備份的main資料夾解壓縮，之後複製所有檔案

![](/images/CleanShot-2025-11-15-at-12.29.35@2x-1024x599.png)

把它複製到剛剛的本地網頁資料夾

![](/images/CleanShot-2025-11-15-at-12.32.25@2x-1024x599.png)

然後我們要修改wp-config.php這一個檔案

![](/images/CleanShot-2025-11-15-at-12.36.18@2x-1024x599.png)

這六個要修正，對應你的資料庫名稱，資料庫帳密，以及本地網址。

```
define( 'DB_NAME', 'wp_zhuangblog' );
<div></div>
/** Database username */
define( 'DB_USER', 'root' );
<div></div>
/** Database password */
define( 'DB_PASSWORD', 'root' );
<div></div>
/** Database hostname */
define( 'DB_HOST', 'localhost' );
<div></div>
define('WP_HOME', 'http://backupreview.local');
define('WP_SITEURL', 'http://backupreview.local');
```

```
define( 'DB_NAME', 'wp_zhuangblog' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

define('WP_HOME', 'http://backupreview.local');
define('WP_SITEURL', 'http://backupreview.local');
```

改完之後要重啟一次，資料庫才會被更改。

否則他不會連到本地測試網站。

![](/images/CleanShot-2025-11-15-at-12.48.01@2x-1024x632.png)

然後就可以點擊Open site連到本地網頁裡了。

有時候瀏覽器會因為某些插件，會有快取。

可能會導致之前的網址被記錄下來。

如果進去還是連到正式機網址，那可以開啟無痕模式輸入網址的方式進去。

進去後發現ㄟ ！樣式怎麼都沒有套進來？這是正常的，因為還沒將uploads資料夾放到wp-content。

![](/images/CleanShot-2025-11-15-at-13.26.07-1024x583.png)

這是我備份的uploads資料夾，要把它移動到本地的wp-content資料夾中。

![](/images/CleanShot-2025-11-15-at-13.40.02@2x-1024x599.png)

先將原來的uploads刪除，然後把剛剛的uploads貼過來。

![](/images/CleanShot-2025-11-15-at-13.41.36@2x-1024x606.png)

再過看剛剛的頁面是不是就成功了！

![](/images/CleanShot-2025-11-15-at-13.44.41-1024x611.png)

![](/images/CleanShot-2025-11-15-at-13.44.56-1024x611.png)

以上就是這次的教學。
