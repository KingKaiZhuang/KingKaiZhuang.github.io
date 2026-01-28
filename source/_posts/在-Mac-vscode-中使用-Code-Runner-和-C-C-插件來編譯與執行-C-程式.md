---
layout: post
title: 在 Mac vscode 中使用 Code Runner 和 C/C++ 插件來編譯與執行 C++ 程式
date: 2024-09-30 23:22:52
tags:
  - "開發環境"
categories:
  - "開發環境"
  - "使用Mac在vscode執行C++"
top_img: "https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Flogo.webp?alt=media&token=81620eff-892d-4194-9b04-d8ddf12fae6c"
cover: "https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Flogo.webp?alt=media&token=81620eff-892d-4194-9b04-d8ddf12fae6c"
---

今天在學校老師突然派一個 c++作業，結果我電腦還沒裝 C++環境，讀檔案一直出問題，我決定今天好好寫一個 Mac 在 vscode 中執行 C++ 的教學。

---

### 在 Mac 上使用 VSCode 的 Code Runner 和 C/C++ 插件來編譯與執行 C++ 程式

這個教學將詳細說明如何使用 **VSCode** 的 **Code Runner** 和 **C/C++ 插件** 來編譯與執行 C++ 程式，並介紹幾個常見功能按鈕的說明。

---

### 1. 確認安裝 Clang 編譯器

**補充：在使用 Clang 之前，必須確保你的 Mac 上已經安裝了 Xcode 或 Xcode Command Line Tools，因為 Clang 是隨 Xcode 一起安裝的。**

### **確認是否已安裝 Xcode**

- 打開 **終端**（Terminal）並輸入以下指令來確認 Xcode 是否已安裝：如果已經安裝，你會看到提示訊息告訴你 Xcode Command Line Tools 已經安裝。如果尚未安裝，系統將自動引導你進行安裝。
  ```bash
  xcode-select --install
  ```

### **檢查 Clang 版本**

1. 打開 **終端**（Terminal）。
2. 輸入以下指令來檢查 Clang 的版本：

   ```bash
   clang --version
   ```

3. 如果 Clang 已安裝，終端會顯示如下類似的版本資訊：

   ```yaml
   Apple clang version 14.0.3 (clang-1403.0.22.14.1)
   Target: x86_64-apple-darwin22.5.0
   Thread model: posix
   InstalledDir: /Library/Developer/CommandLineTools/usr/bin
   ```

---

### 2. 使用 Code Runner 和 C/C++ 插件執行 C++ 程式

在進行程式開發之前，你需要在 **VSCode** 中安裝 **Code Runner** 和 **C/C++ 插件**。

### **安裝 Code Runner 插件**

1. 在 **VSCode** 中打開擴展市場，搜尋 **Code Runner**，然後點擊 **Install** 安裝插件。

   - [Code Runner 插件下載](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)

   ![Code Runner 插件畫面](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Fvscode-c%2B%2B2.png?alt=media&token=e98ba65b-edb2-4297-9624-958312ecacb9)

### **安裝 C/C++ 插件**

1. 在 **VSCode** 中搜尋 **C/C++**，然後點擊 **Install** 安裝插件。

   - [C/C++ 插件下載](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)

   ![C/C++ 插件畫面](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Fvscode-c%2B%2B1.png?alt=media&token=1c42e65c-d4b0-4e61-862a-78d16a519637)

---

### 3. 編寫與運行 C++ 程式

1. **創建 C++ 檔案**：

   - 在 **VSCode** 中創建一個新檔案 `hello.cpp`，並寫入以下 C++ 代碼：

     ```cpp
     cpp
     複製程式碼
     #include <iostream>using namespace std;

     int main() {
         string greeting = "Hello, World!";
         string welcome = "Welcome to C++ programming!";
         string message = "Let's learn and have fun!";
         int year = 2023;
         double version = 1.0;
         char initial = 'C';

         cout << greeting << endl;
         cout << welcome << endl;
         cout << message << endl;
         cout << "Current year: " << year << endl;
         cout << "Version: " << version << endl;
         cout << "Initial: " << initial << endl;

         for (int i = 1; i <= 14; ++i) {
             cout << "This is line number " << i + 6 << endl;
         }

         return 0;
     }

     ```

2. **執行程式碼**：

   - 使用 **Code Runner** 插件，你可以直接運行程式碼，無需手動編譯。按下 **執行按鈕**（Run Code）。
   - 程式的輸出會顯示在 **VSCode** 的終端中。

   ![執行 C++ 程式畫面](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Fvscode-c%2B%2B3.png?alt=media&token=f0a05a16-640f-4afc-9e49-0845bb5f7328)

   ![執行結果畫面](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Fvscode-c%2B%2B4.png?alt=media&token=b54995aa-fb3d-43ba-9aae-96d777de5f59)

---

### 4. 功能按鈕的使用說明

在你使用 **Code Runner** 和 **C/C++ 插件** 時，可能會看到以下幾個選項：

1. **CompileRun: Compile with default flags & Run with default arguments**
   - 使用預設的編譯選項來編譯並執行程式。
2. **Debug C/C++ File**
   - 啟動 C/C++ 的除錯模式，允許你設置斷點、逐步執行程式並檢查變數。
3. **Run Code**
   - 使用 **Code Runner** 插件直接運行程式，不需手動編譯，適合快速測試。
4. **CompileRun: Debug**
   - 使用除錯模式進行編譯和執行，便於進行問題排查。
5. **Run C/C++ File**
   - 專門針對 C/C++ 檔案進行執行，通常會先編譯再運行。

這些功能按鈕能讓你靈活選擇是否快速測試、完整編譯或進行除錯，根據需求選擇合適的功能即可。

![功能按鈕選項畫面](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Fvscode-c%2B%2B5.png?alt=media&token=16237bbf-7d95-4230-965b-d06e511aa7b5)

---

### 5. 執行結果

當你成功編譯和執行程式後，應該會在 **VSCode** 終端中看到以下輸出：

```vbnet
vbnet
複製程式碼
Hello, World!
Welcome to C++ programming!
Let's learn and have fun!
Current year: 2023
Version: 1.0
Initial: C
This is line number 7
This is line number 8
...
This is line number 20

```

---

### Debug 逐行教學

當你進入 **Debug 模式** 後，可以逐行檢查程式的運行情況。以下是一個變數在 Debug 模式下顯示的範例：

1. 可以看到變數 `greeting` 及其值已在右側顯示。

   ![Debug 模式畫面](https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2Fmac%20%E5%9C%A8%20vscode%20%E5%9F%B7%E8%A1%8C%20c%2B%2B%2Fvscode-c%2B%2B6.png?alt=media&token=e0b4e072-a7ef-43a6-9845-65716b722a96)
