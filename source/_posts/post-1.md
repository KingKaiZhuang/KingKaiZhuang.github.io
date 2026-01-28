---
layout: post
title: C++ 筆記 - Vector 使用方式
date: 2024-11-20 23:22:52
tags:
  - "C++"
categories:
  - "C++"
  - "Vector"
top_img: "https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FC%2B%2B%20%E7%AD%86%E8%A8%98%2Fvector.webp?alt=media&token=13648a6d-cbd4-4420-974c-bc2c56ae85c4"
cover: "https://firebasestorage.googleapis.com/v0/b/zhuang-afef4.appspot.com/o/KingKaiZhuang.github.io%2FC%2B%2B%20%E7%AD%86%E8%A8%98%2Fvector.webp?alt=media&token=13648a6d-cbd4-4420-974c-bc2c56ae85c4"
---

# Vector 實戰教學

### **1. `vector` 的基本操作**

### **定義與初始化**

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // 定義一個空的 vector
    vector<int> vec;

    // 定義並初始化
    vector<int> vec2 = {1, 2, 3, 4, 5};

    // 定義固定大小的 vector，初始值為 0
    vector<int> vec3(5, 0); // 5 個元素，每個元素初始值為 0

    // 輸出 vec2 的內容
    for (int x : vec2) {
        cout << x << " ";
    }

    return 0;
}

```

**輸出：**

```
1 2 3 4 5
```

---

### **2. 動態增加和刪除元素**

### **增加元素**

- 使用 `push_back()` 在尾部添加元素。
- 使用 `insert()` 在特定位置插入元素。

### **刪除元素**

- 使用 `pop_back()` 刪除尾部元素。
- 使用 `erase()` 刪除指定位置的元素。

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> vec = {1, 2, 3, 4, 5};

    // 在尾部添加元素
    vec.push_back(6);

    // 在位置 2 插入元素 10
    vec.insert(vec.begin() + 2, 10);

    // 刪除尾部元素
    vec.pop_back();

    // 刪除位置 2 的元素
    vec.erase(vec.begin() + 2);

    // 輸出內容
    for (int x : vec) {
        cout << x << " ";
    }

    return 0;
}
```

**輸出：**

```
1 2 3 4 5
```

---

### **3. 常用方法與屬性**

### **方法**

| 方法名               | 功能                                                |
| -------------------- | --------------------------------------------------- |
| `push_back(value)`   | 在尾部添加一個元素                                  |
| `pop_back()`         | 刪除尾部元素                                        |
| `insert(pos, value)` | 在 `pos` 位置插入一個元素                           |
| `erase(pos)`         | 刪除 `pos` 位置的元素                               |
| `clear()`            | 刪除所有元素                                        |
| `size()`             | 返回當前元素數量                                    |
| `empty()`            | 判斷是否為空                                        |
| `resize(n, value)`   | 調整大小為 `n`，多出部分用 `value` 填充（默認為 0） |
| `front()`            | 返回第一個元素                                      |
| `back()`             | 返回最後一個元素                                    |
| `at(index)`          | 返回索引 `index` 處的元素，帶範圍檢查               |

---

### **範例：檢查方法的用法**

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> vec = {1, 2, 3, 4, 5};

    // 大小和是否為空
    cout << "Size: " << vec.size() << endl;
    cout << "Is empty: " << (vec.empty() ? "Yes" : "No") << endl;

    // 訪問元素
    cout << "First element: " << vec.front() << endl;
    cout << "Last element: " << vec.back() << endl;
    cout << "Element at index 2: " << vec.at(2) << endl;

    // 清空 vector
    vec.clear();
    cout << "Size after clear: " << vec.size() << endl;

    return 0;
}

```

**輸出：**

```yaml
Size: 5
Is empty: No
First element: 1
Last element: 5
Element at index 2: 3
Size after clear: 0
```
