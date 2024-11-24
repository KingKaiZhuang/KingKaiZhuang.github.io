---
layout: post
title: 撰寫 Python 發送成績給學生確認
date: 2024-11-02 13:43:31
tags: [Python Email]
categories: [Python, Email]
top_img: https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2F%E6%92%B0%E5%AF%AB%20Python%20%E7%99%BC%E9%80%81%E6%88%90%E7%B8%BE%E7%B5%A6%E5%AD%B8%E7%94%9F%E7%A2%BA%E8%AA%8D%2Fpython-mailscore.webp?alt=media&token=0ed4da31-e1b5-4ea3-8f89-0ecf46d0f30c
cover: https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2F%E6%92%B0%E5%AF%AB%20Python%20%E7%99%BC%E9%80%81%E6%88%90%E7%B8%BE%E7%B5%A6%E5%AD%B8%E7%94%9F%E7%A2%BA%E8%AA%8D%2Fpython-mailscore.webp?alt=media&token=0ed4da31-e1b5-4ea3-8f89-0ecf46d0f30c
---

### 程式功能概述

此 Python 程式使用 `smtplib` 庫來自動發送學生成績通知郵件。從 Excel 檔案中讀取每位學生的成績，並依據其學號生成專屬郵件，郵件以純文字格式發送至指定學校郵箱地址。為了避免 Gmail 將郵件自動摺疊，程式為每封郵件添加了唯一的時間標記。

---

### 步驟詳解

### 1. 準備所需的程式庫

我們使用以下程式庫：

- `pandas`：讀取 Excel 檔案，將學生的成績資料導入程式。
- `smtplib`：用於設置 SMTP 伺服器並發送郵件。
- `datetime`：生成唯一的時間標記，避免 Gmail 認定郵件內容相同。

```python
import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
```

### 2. 讀取 Excel 檔案

使用 `pandas` 讀取 Excel 檔案的「工作表 1」工作表。只提取所需的欄位：`班級`、`學號`、`姓名`、`隨堂1` 至 `隨堂4`。

```python
file_path = 'ta-score-mid.xlsx'
data = pd.read_excel(file_path, sheet_name='工作表1')
data = data[['班級', '學號', '姓名', '隨堂1', '隨堂2', '隨堂3', '隨堂4']]
```

### 3. 設置 SMTP 伺服器

在此程式中，我們使用 Gmail 的 SMTP 伺服器來發送郵件。設置伺服器地址、登入帳號和應用程式密碼。

```python
smtp_server = "smtp.gmail.com"
smtp_port = 587
smtp_user = "your_email@gmail.com"  # 替換為您的 Gmail 地址
smtp_password = "your_app_specific_password"  # 替換為您的應用程式密碼
```

### 4. 開啟伺服器連接

使用 `smtplib.SMTP` 建立伺服器連接，啟動 TLS 安全層後登入帳號。

```python
server = smtplib.SMTP(smtp_server, smtp_port)
server.starttls()
server.login(smtp_user, smtp_password)
```

### 5. 構建並發送郵件

對每位學生資料迴圈處理：

1. 生成個性化的郵件主體，包含學生成績資訊。
2. 將「學號」欄位轉為小寫格式，以符合學校郵箱格式。
3. 添加當前時間作為唯一標記，避免 Gmail 摺疊郵件。

```python
for index, row in data.iterrows():
    student_id = row['學號'].lower()
    student_name_full = row['姓名']
    student_name = student_name_full[-2:]
    email_to = f"{student_id}@stust.edu.tw, {student_id}@office.stust.edu.tw"
    subject = "基礎數學 期中作業成績確認"

    scores = (
        f"隨堂1: {row['隨堂1']}\\n"
        f"隨堂2: {row['隨堂2']}\\n"
        f"隨堂3: {row['隨堂3']}\\n"
        f"隨堂4: {row['隨堂4']}"
    )

    unique_marker = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    body = (
        f"{student_name} 同學哈囉!\\n\\n"
        "這是你的隨堂成績:\\n\\n"
        f"{scores}\\n\\n"
        "如果有任何問題或是作業需要補交都記得要跟我說一下哦。\\n\\n"
        "TA 莊鈞凱\\n"
        "祝你下週期中考試每一科都💯\\n\\n"
        "Web: <https://kingkaizhuang.github.io/\\n\\n>"
        f"唯一標記：{unique_marker}"
    )

    message = MIMEMultipart()
    message["From"] = f"基礎數學助教 <{smtp_user}>"
    message["To"] = email_to
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    server.sendmail(smtp_user, email_to.split(", "), message.as_string())
    print(f"已發送成績給 {student_name_full} ({email_to})")
```

### 6. 關閉伺服器連接

在所有郵件發送完畢後，關閉 SMTP 伺服器連接。

```python
server.quit()
```

---

### 完整程式碼

```python
import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

file_path = 'ta-score-mid.xlsx'
data = pd.read_excel(file_path, sheet_name='工作表1')
data = data[['班級', '學號', '姓名', '隨堂1', '隨堂2', '隨堂3', '隨堂4']]

smtp_server = "smtp.gmail.com"
smtp_port = 587
smtp_user = "your_email@gmail.com"  # 替換為您的 Gmail 地址
smtp_password = "your_app_specific_password"  # 替換為您的應用程式密碼

server = smtplib.SMTP(smtp_server, smtp_port)
server.starttls()
server.login(smtp_user, smtp_password)

for index, row in data.iterrows():
    student_id = row['學號'].lower()
    student_name_full = row['姓名']
    student_name = student_name_full[-2:]
    email_to = f"{student_id}@stust.edu.tw, {student_id}@office.stust.edu.tw"
    subject = "基礎數學 期中作業成績確認"

    scores = (
        f"隨堂1: {row['隨堂1']}\\n"
        f"隨堂2: {row['隨堂2']}\\n"
        f"隨堂3: {row['隨堂3']}\\n"
        f"隨堂4: {row['隨堂4']}"
    )

    unique_marker = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    body = (
        f"{student_name} 同學哈囉!\\n\\n"
        "這是你的隨堂成績:\\n\\n"
        f"{scores}\\n\\n"
        "如果有任何問題或是作業需要補交都記得要跟我說一下哦。\\n\\n"
        "TA 莊鈞凱\\n"
        "祝你下週期中考試每一科都💯\\n\\n"
        "Web: <https://kingkaizhuang.github.io/\\n\\n>"
        f"唯一標記：{unique_marker}"
    )

    message = MIMEMultipart()
    message["From"] = f"基礎數學助教 <{smtp_user}>"
    message["To"] = email_to
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain"))

    server.sendmail(smtp_user, email_to.split(", "), message.as_string())
    print(f"已發送成績給 {student_name_full} ({email_to})")

server.quit(
```
