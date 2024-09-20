---
layout: post
title: UVA 10041 - Vito's Family
date: 2024-09-16 23:49:32
tags: [CPE]
categories: [程式解題, CPE49題]
top_img: /images/CPE_sub.webp
cover: /images/CPE.webp
---

題目來源：[UVA 10041 - Vito's Family](https://onlinejudge.org/external/100/10041.pdf)

## 題目描述

Vito 的家族住在同一條街上，但每個人的住址可能不同。Vito 想找到一個住址，使得該住址到家族成員所有住址的總距離最小。給定每位家族成員的住址，找出這個最佳的住址，並計算最小總距離。

## 解題思路

本題的核心在於如何選擇一個最佳住址，使得所有成員到該住址的總距離最小。最佳的住址是所有家族成員住址的中位數，因為中位數在統計學中能最小化絕對差距的總和。

### 步驟：

1. **輸入測試案例數量**。
2. **輸入家族成員數量與其住址**。
3. **對住址進行排序，找出中位數作為最佳住址**。
4. **計算每個住址與中位數之間的距離總和**。
5. **輸出最小總距離**。

## 程式碼

```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main()
{
    int testCases;
    cin >> testCases;

    while(testCases--) {
        int numRelatives;
        cin >> numRelatives;

        vector<int> addresses(numRelatives);
        for(int i = 0; i < numRelatives; i++) {
            cin >> addresses[i];
        }

        // 排序住址，找到中位數
        sort(addresses.begin(), addresses.end());
        int medianAddress = addresses[numRelatives / 2];
        int totalDistance = 0;

        // 計算總距離
        for(int i = 0; i < numRelatives; i++) {
            totalDistance += abs(addresses[i] - medianAddress);
        }

        // 輸出結果
        cout << totalDistance << endl;
    }

    return 0;
}
```
