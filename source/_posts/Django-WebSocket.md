---
layout: post
title: Django WebSocket 前後端即時通訊
date: 2024-10-24 10:00:30
tags: [Python Django]
categories: [WebSocket]
top_img: https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FDjango%2Fwebsocket.webp?alt=media&token=7e9597ac-6eb5-480c-b7ae-862eede0f1ab
cover: https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FDjango%2Fwebsocket.webp?alt=media&token=7e9597ac-6eb5-480c-b7ae-862eede0f1ab
---

## 全部步驟總結

1.  **安裝必要的套件**：

    ```bash
    pip install channels channels_redis
    ```

    - **channels**：使 Django 支持 WebSocket。
    - **channels_redis**：用來實現 Channel Layer，讓不同的 WebSocket 連接能夠進行通訊。

2.  **設定 Django 專案**：

    - 在 `settings.py` 中添加 Channels 和 Channel Layer 配置：

    ```python
    INSTALLED_APPS = [
        # 其他已安裝的應用
        'channels',
        'chat',  # 你的 WebSocket 應用
    ]

    ASGI_APPLICATION = 'classify.asgi.application'

    CHANNEL_LAYERS = {
        'default': {
            'BACKEND': 'channels_redis.core.RedisChannelLayer',
            'CONFIG': {
                "hosts": [('127.0.0.1', 6379)],  # Redis 默認地址和端口
            },
        },
    }
    ```

3.  **創建 `asgi.py` 文件**：
    在 `classify` 專案目錄下，確保 `asgi.py` 設定為：

    ```python
    import os
    from django.core.asgi import get_asgi_application
    from channels.routing import ProtocolTypeRouter, URLRouter
    from channels.auth import AuthMiddlewareStack
    from chat import routing

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'classify.settings')

    application = ProtocolTypeRouter({
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(
                routing.websocket_urlpatterns
            )
        ),
    })
    ```

4.  **創建 `chat/routing.py` 文件**：
    設置 WebSocket 路由：

    ```python
    from django.urls import path
    from . import consumers

    websocket_urlpatterns = [
        path('ws/chat/', consumers.ChatConsumer.as_asgi()),
    ]
    ```

5.  **編寫 `chat/consumers.py`**：
    設計 WebSocket Consumer，可以通過 Channel Layer 發送消息：

    ````python
    import json
    from channels.generic.websocket import AsyncWebsocketConsumer
    from channels.layers import get_channel_layer
    from asgiref.sync import async_to_sync

        class ChatConsumer(AsyncWebsocketConsumer):
            async def connect(self):
                self.room_name = "chat_room"
                self.room_group_name = f"chat_{self.room_name}"

                await self.channel_layer.group_add(
                    self.room_group_name,
                    self.channel_name
                )
                await self.accept()

            async def disconnect(self, close_code):
                await self.channel_layer.group_discard(
                    self.room_group_name,
                    self.channel_name
                )

            async def receive(self, text_data):
                text_data_json = json.loads(text_data)
                message = text_data_json['message']

                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'chat_message',
                        'message': message
                    }
                )

            async def chat_message(self, event):
                message = event['message']
                await self.send(text_data=json.dumps({
                    'message': message
                }))

            @staticmethod
            def send_to_frontend(message):
                channel_layer = get_channel_layer()
                async_to_sync(channel_layer.group_send)(
                    "chat_chat_room",
                    {
                        'type': 'chat_message',
                        'message': message
                    }
                )
        ```

    ````

6.  **創建自定義 Django 命令**：
    在 `chat/management/commands/send_message.py` 中添加：

    ```python
    from django.core.management.base import BaseCommand
    from chat.consumers import ChatConsumer

    class Command(BaseCommand):
        help = 'Send a WebSocket message from backend'

        def handle(self, *args, **kwargs):
            message = "這是從後端通過 command 發送的 WebSocket 訊息"
            ChatConsumer.send_to_frontend(message)
            self.stdout.write(self.style.SUCCESS('Message sent successfully'))
    ```

7.  **運行 Django 項目**：
    確保 Redis 在運行，然後啟動 Django：
    ```bash
    python3 manage.py runserver
    ```
8.  **從命令行發送訊息**：
    使用自定義命令從後端發送訊息：
    ```bash
    python3 manage.py send_message
    ```

## 程式執行順序步驟

### 1. 用戶端建立 WebSocket 連接

當用戶開啟瀏覽器並連接到你的 WebSocket 路徑 `/ws/chat/` 時，會觸發 `ChatConsumer` 的 `connect()` 方法：

- **步驟**：
  1. 用戶端（例如瀏覽器）使用 JavaScript 建立 WebSocket 連接。
  2. Django Channels 會啟動 `ChatConsumer` 的 `connect()` 方法。
  3. 用戶端被加入到 `chat_chat_room` 群組，這是透過 `self.channel_layer.group_add()` 方法實現的。
  4. 連接成功後，`await self.accept()` 允許 WebSocket 連接繼續。
- **Redis 的角色**：
  - Redis 會存儲群組 `chat_chat_room` 的資訊，記錄有哪些 WebSocket 連接屬於這個群組。

### 2. 從後端發送訊息

當你運行以下命令時，將觸發後端發送訊息：

```bash
python3 manage.py send_message
```

- **步驟**：
  1. Django 運行 `send_message` 命令，調用 `ChatConsumer.send_to_frontend()` 方法。
  2. `send_to_frontend()` 使用 `get_channel_layer()` 取得 Channels Layer，並調用 `async_to_sync(channel_layer.group_send(...))` 發送訊息到 `chat_chat_room`。
  3. 這個訊息會被放入 Redis，由 Redis 處理接下來的訊息分發。

### 3. 消費者接收訊息

每一個屬於 `chat_chat_room` 群組的 WebSocket 連接，都會收到這條訊息，並觸發 `ChatConsumer` 中的 `chat_message()` 方法：

- **步驟**：
  1. `chat_message()` 方法會被觸發，接收來自 Redis 的訊息。
  2. 它將訊息轉換為 JSON 格式，然後通過 `await self.send(...)` 發送給 WebSocket 連接的用戶端。

### 4. 用戶端顯示訊息

前端的 JavaScript 監聽 `onmessage` 事件，並顯示從後端接收到的訊息：

- **步驟**：
  1. 用戶端的 WebSocket 連接收到來自伺服器的訊息。
  2. `onmessage` 事件被觸發，並執行對應的 JavaScript 函數來處理這條訊息，例如在控制台打印出來或顯示在網頁上。

### 整體流程總結

1. **建立連接**：用戶端連接到 `/ws/chat/`，被加入到 `chat_chat_room` 群組，Redis 記錄連接資訊。
2. **後端發送訊息**：你運行 `send_message` 命令，後端通過 Channels Layer 和 Redis 將訊息傳給 `chat_chat_room`。
3. **訊息分發**：Redis 處理訊息分發，確保所有屬於 `chat_chat_room` 的 WebSocket 連接都收到這條訊息。
4. **前端接收並顯示**：用戶端接收到訊息，觸發 JavaScript 的 `onmessage` 事件，並在頁面上顯示內容。

### Redis 的功能

- **作為 Channel Layer 的後端**：Redis 被用來存儲和傳遞 WebSocket 訊息。當 Django 需要向某個群組或某個連接發送訊息時，Channels 會把訊息放入 Redis，然後由其他連接取出並傳遞給相應的 WebSocket。
- **訊息中繼**：Redis 可以在多個 Django 節點之間中繼訊息，這使得即使在高負載或多伺服器環境下，WebSocket 仍然能穩定運作。

### Channel Layer 的功能

- **實現群組通信**：讓不同的 WebSocket 連接（甚至不同伺服器上的連接）可以被分組。通過 `group_add()` 和 `group_send()` 來把訊息發送到特定的群組，使得多人可以即時收到更新。
- **跨進程通信**：Channel Layer 可以在不同進程間傳遞訊息，允許伺服器間或與背景任務間的即時溝通。
