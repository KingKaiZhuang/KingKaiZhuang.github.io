---
layout: post
title: UVA 10420 - List of Conquests
date: 2024-09-17 14:39:31
tags:
  - "CPE"
categories:
  - "程式解題"
  - "CPE49題"
top_img: /images/CPE_sub.webp
cover: /images/CPE.webp
---

## 題目描述

題要求我們統計來自不同國家的名字出現次數。輸入包括多行，每行以一個國家名稱開頭，後接一個人名。我們只需要統計每個國家出現的次數，而不需要考慮人名。

- 題目來源：[UVA 10420 - List of Conquests](https://onlinejudge.org/external/104/10420.pdf)

## 解題思路

1. **輸入處理**：每行的輸入以國家名稱開頭，後面跟著人名。我們只需要提取每行中的國家名稱並忽略後面的內容。
2. **統計國家出現次數**：我們可以使用 `map` 來儲存國家名稱和對應的出現次數。
3. **排序與輸出**：`map` 會自動根據國家名稱字典序進行排序，因此輸出時會直接按順序列出。

### 步驟：

1. **讀取輸入行數**：首先讀取輸入的總行數。
2. **讀取每行的國家名稱**：使用 `getline()` 函數讀取整行，並透過 `find()` 函數找到第一個空格來提取國家名稱。
3. **統計國家出現次數**：利用 `map` 來儲存每個國家的出現次數。
4. **輸出結果**：遍歷 `map`，輸出國家名稱及其出現次數。

## 程式碼

```cpp
#include <iostream>
#include <map>
#include <string>
using namespace std;

int main()
{
    int number;
    string country;
    cin >> number;
    cin.ignore();

    map<string, int> country_count;

    while(number--) {
        string line;
        getline(cin, line);
        int pos = line.find(' ');
        country = line.substr(0, pos);
        country_count[country]++;
    }

    // 輸出結果
    for(const pair<string, int>& entry : country_count) {
        cout << entry.first << " " << entry.second << endl;
    }

    return 0;
}
```
