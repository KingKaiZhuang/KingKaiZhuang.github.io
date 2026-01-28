---
layout: post
title: Line Bot 與 Openai & SQL 03 - 成績查詢
date: 2024-10-02 16:30:06
tags:
  - "Line Bot"
categories:
  - "Line Bot"
  - "成績查詢練習"
top_img: "https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FLine-Bot%E5%92%8Cgpt%E5%AF%A6%E6%88%B0%E6%95%99%E5%AD%B8%2Fstudent-score%2Flinebot-student.webp?alt=media&token=b991afe3-27a4-4d32-a1d7-5b34b8849a11"
cover: "https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FLine-Bot%E5%92%8Cgpt%E5%AF%A6%E6%88%B0%E6%95%99%E5%AD%B8%2Fstudent-score%2Flinebot-student.webp?alt=media&token=b991afe3-27a4-4d32-a1d7-5b34b8849a11"
---

參考來源 : https://www.youtube.com/watch?v=IfzY0axpjD8&t=333s

## 基於 LINE Bot 與 OpenAI 的 MySQL 學生成績管理系統教學文件

### 目錄

1. 前言
2. 系統需求與工具
3. 資料庫設計與結構
4. 插入 15 位學生的資料
5. 為每位學生插入成績
6. 使用 OpenAI 生成 SQL 語句
7. LINE Bot 與 OpenAI 整合
8. 查詢學生成績
9. 常見問題與解決方案
10. 結論

---

### 1. 前言

本教學文件將指導您如何建立一個基於 MySQL 的學生成績管理系統，並通過 LINE Bot 與 OpenAI 的整合來查詢和管理數據。我們將介紹如何使用 LINE Bot 接收訊息、OpenAI 自動生成 SQL 語句，並通過 MySQL 查詢學生的成績。

---

### 2. 系統需求與工具

**系統需求：**

- 安裝了 MySQL 伺服器
- Python 3 環境（Flask、OpenAI 和 LINE Bot SDK）
- MySQL 客戶端或管理工具（如 MySQL Workbench）
- OpenAI API 金鑰
- LINE Bot API 金鑰

**工具：**

- MySQL 伺服器
- MySQL Workbench 或命令行工具
- LINE Bot 設定
- OpenAI API 設定

---

### 3. 資料庫設計與結構

在本系統中，我們將創建兩個資料表：一個用來存儲學生的基本信息，另一個用來存儲學生的成績。

### `student` 資料表結構：

```sql
CREATE TABLE student (
    sno INT PRIMARY KEY,     -- 學號
    class VARCHAR(50),       -- 班級
    name VARCHAR(100),       -- 學生姓名
    sex VARCHAR(10),         -- 性別
    address VARCHAR(255),    -- 地址
    memo TEXT                -- 備註
);

```

### `score` 資料表結構：

```sql
CREATE TABLE score (
    sno INT,                 -- 學號 (外鍵)
    class VARCHAR(50),       -- 班級
    subject VARCHAR(100),    -- 科目
    score INT                -- 成績
);

```

這兩個資料表使用 `sno` 欄位關聯，來管理學生的基本信息和成績。

---

### 4. 插入 15 位學生的資料

接下來，我們將插入 15 位學生的資料：

```sql
INSERT INTO student (sno, class, name, sex, address, memo) VALUES
(1, 'Class 1', 'John Doe', 'M', '123 Street A', 'Excellent performance'),
(2, 'Class 2', 'Jane Smith', 'F', '456 Street B', 'Needs improvement in math'),
(3, 'Class 3', 'Alice Brown', 'F', '789 Street C', 'Top student'),
(4, 'Class 1', 'Bob Johnson', 'M', '1010 Street D', 'New student'),
(5, 'Class 2', 'Charlie Davis', 'M', '1111 Street E', 'Struggles with homework'),
(6, 'Class 3', 'Diana White', 'F', '1212 Street F', 'Shows great potential'),
(7, 'Class 1', 'Evan Green', 'M', '1313 Street G', 'Good participation'),
(8, 'Class 2', 'Fiona Blue', 'F', '1414 Street H', 'Excellent attendance'),
(9, 'Class 3', 'George Black', 'M', '1515 Street I', 'Needs focus on studies'),
(10, 'Class 1', 'Hannah Yellow', 'F', '1616 Street J', 'Very creative'),
(11, 'Class 2', 'Ivan Orange', 'M', '1717 Street K', 'Great in sports'),
(12, 'Class 3', 'Jenny Purple', 'F', '1818 Street L', 'Good academic performance'),
(13, 'Class 1', 'Kevin Red', 'M', '1919 Street M', 'Enthusiastic in class'),
(14, 'Class 2', 'Lily Pink', 'F', '2020 Street N', 'Hardworking student'),
(15, 'Class 3', 'Michael Cyan', 'M', '2121 Street O', 'Quick learner');
```

![student DB](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FLine-Bot%E5%92%8Cgpt%E5%AF%A6%E6%88%B0%E6%95%99%E5%AD%B8%2Fstudent-score%2Fstudent-studens.png?alt=media&token=af046ad4-c41a-4823-88c8-d196058d3f32)

### 5. 為每位學生插入成績

接下來，我們為每位學生插入 `數學` 和 `國文` 的成績：

```sql
INSERT INTO score (sno, class, subject, score) VALUES
(1, 'Class 1', '數學', 85),
(1, 'Class 1', '國文', 90),
(2, 'Class 2', '數學', 78),
(2, 'Class 2', '國文', 88),
(3, 'Class 3', '數學', 92),
(3, 'Class 3', '國文', 95),
(4, 'Class 1', '數學', 76),
(4, 'Class 1', '國文', 85),
(5, 'Class 2', '數學', 82),
(5, 'Class 2', '國文', 89),
(6, 'Class 3', '數學', 88),
(6, 'Class 3', '國文', 91),
(7, 'Class 1', '數學', 90),
(7, 'Class 1', '國文', 87),
(8, 'Class 2', '數學', 85),
(8, 'Class 2', '國文', 92),
(9, 'Class 3', '數學', 80),
(9, 'Class 3', '國文', 90),
(10, 'Class 1', '數學', 87),
(10, 'Class 1', '國文', 88),
(11, 'Class 2', '數學', 89),
(11, 'Class 2', '國文', 91),
(12, 'Class 3', '數學', 94),
(12, 'Class 3', '國文', 96),
(13, 'Class 1', '數學', 75),
(13, 'Class 1', '國文', 85),
(14, 'Class 2', '數學', 88),
(14, 'Class 2', '國文', 92),
(15, 'Class 3', '數學', 93),
(15, 'Class 3', '國文', 95);
```

[![student-score](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FLine-Bot%E5%92%8Cgpt%E5%AF%A6%E6%88%B0%E6%95%99%E5%AD%B8%2Fstudent-score%2Fstudent-score.png?alt=media&token=745ae4d1-f357-40d7-b972-81c299714061)](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FLine-Bot%E5%92%8Cgpt%E5%AF%A6%E6%88%B0%E6%95%99%E5%AD%B8%2Fstudent-score%2Fstudent-score.png?alt=media&token=745ae4d1-f357-40d7-b972-81c299714061)

---

### 6. 使用 OpenAI 生成 SQL 語句

當 LINE Bot 接收到查詢訊息時，會呼叫 OpenAI API 自動生成 SQL 查詢語句。以下是範例的整合程式碼片段：

```python
response = openai.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant that helps users query a MySQL database."},
        {"role": "user", "content": event.message.text}
    ],
    temperature=0,
    max_tokens=400,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)

```

---

### 7. LINE Bot 與 OpenAI 整合完整程式碼

整合 LINE Bot 與 OpenAI API，並將接收到的查詢請求轉換為 SQL 查詢並從 MySQL 資料庫中提取資料。以下是完整的程式碼片段：

```python
import openai
from flask import Flask, request, abort
from linebot import LineBotApi, WebhookHandler
from linebot.exceptions import InvalidSignatureError
from linebot.models import MessageEvent, TextMessage, TextSendMessage
import pymysql
import re

app = Flask(__name__)

# 設定 Linebot 的 Channel Access Token 和 Channel Secret
# 目前是 鈞皓科技 的 LineBot
line_bot_api = LineBotApi('')
handler = WebhookHandler('')

# 設定 OpenAI API 金鑰
openai.api_key = ''

# 資料庫連接設定
db_settings = {
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "password",
    "db": "studentdb",
    "charset": "utf8"
}

@app.route("/")
def root():
    return "Hello, World!"

@app.route("/callback", methods=['POST'])
def callback():
    signature = request.headers['X-Line-Signature']
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)

    try:
        print("Request body: " + signature)
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)

    return 'OK'

@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    try:
        # 呼叫 OpenAI ChatCompletion API 來生成 SQL 語句
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that helps users query a MySQL database."},
                {"role": "user", "content": event.message.text}
            ],
            temperature=0,
            max_tokens=400,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        # 處理 OpenAI 回應，過濾掉非 SQL 的部分
        response_text = response.choices[0].message['content'].strip()

        # 使用正則表達式過濾掉註解和解釋部分，只保留 SQL 語句
        sql_match = re.search(r"SELECT.*?;", response_text, re.DOTALL)
        if sql_match:
            response_sql = sql_match.group(0).strip()  # 提取到 SQL 語句
        else:
            response_sql = ""  # 如果沒有找到有效的 SQL，設為空

        # 檢查是否有生成有效的 SQL 語句
        if response_sql:
            # 串接資料庫並執行 SQL 查詢
            conn = pymysql.connect(**db_settings)
            with conn.cursor() as cursor:
                command = response_sql.replace("\n", " ")  # 移除多餘的換行符號
                print("Executing SQL:", command)
                cursor.execute(command)
                result = cursor.fetchall()

            # 格式化查詢結果
            line_data = "class\tsubject\tscore\n"
            line_data += "-------------------\n"

            for row in result:
                line_data += f"{row[0]}\t{row[1]}\t{row[2]}\n"

            # 回傳結果給 LINE 用戶
            line_bot_api.reply_message(event.reply_token, TextSendMessage(text=response_sql + '\n' + line_data))
        else:
            line_bot_api.reply_message(event.reply_token, TextSendMessage(text="未能生成有效的 SQL 查詢語句。"))

    except Exception as e:
        print("Error:", e)
        line_bot_api.reply_message(event.reply_token, TextSendMessage(text="發生錯誤，請稍後再試。"))

if __name__ == "__main__":
    app.run()

```

### 8. Demo 時間

[![linebot-demo](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FLine-Bot%E5%92%8Cgpt%E5%AF%A6%E6%88%B0%E6%95%99%E5%AD%B8%2Fstudent-score%2F%E6%88%AA%E5%9C%96%202024-10-02%20%E6%99%9A%E4%B8%8A8.14.39.png?alt=media&token=de5ac121-8dc2-4912-be23-0ac4a82635ca)](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FLine-Bot%E5%92%8Cgpt%E5%AF%A6%E6%88%B0%E6%95%99%E5%AD%B8%2Fstudent-score%2F%E6%88%AA%E5%9C%96%202024-10-02%20%E6%99%9A%E4%B8%8A8.14.39.png?alt=media&token=de5ac121-8dc2-4912-be23-0ac4a82635ca)
