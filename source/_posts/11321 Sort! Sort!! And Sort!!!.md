---
layout: post
title: UVA 11321 Sort! Sort!! And Sort!!!
date: 2026-02-12 14:25:56
tags:
  - "CPE"
categories:
  - "程式解題"
  - "CPE49題"
top_img: /images/CPE_sub.webp
cover: /images/CPE.webp
---

題目來源：[UVA 11321 - Sort! Sort!! And Sort!!!](https://onlinejudge.org/external/113/11321.pdf)

## 解題思路

本題要求按照特定規則對一系列整數進行排序。規則如下：

1.  **優先比較餘數**：將數字除以 $M$ 的餘數（`num % M`）由小到大排序。
2.  **餘數相同時**：
    -   **奇偶數性質**：奇數 (Odd) 優先於偶數 (Even)。
    -   **皆為奇數**：數值較**大**者排在前面。
    -   **皆為偶數**：數值較**小**者排在前面。

## 程式解說

1.  **模擬 C 語言的餘數運算**：Python 的 `%` 運算子在處理負數時與 C/C++ 不同（例如：`-10 % 3` 在 Python 是 `2`，在 C 是 `-1`）。題目要求的是 C 語言風格的餘數，因此需要針對負數做修正。

## 程式碼

```python
def sort_key(num):
	r=mod(num,m)
	
	if num%2!=0:
		isOdd=0
		last=-num
	else:
		isOdd=1
		last=num
	
	return (r,isOdd,last)
	
def mod(x,m):
	mo=x%m
	if x<0 and mo>0:
		mo=x%m-m
	return mo

while True:
	n,m=map(int,input().split())
	print(n,m)
	if n==0 and m==0:
		break
	numList=[]
	
	for _ in range(n):
		number=int(input())
		numList.append(number)
	
	numList.sort(key=sort_key)
	
	for i in numList:
		print(i)
```

## 補充：Python 與 C 的 Modulo 差異

在解這題時，需特別注意 Python 與 C/C++ 對於負數取餘數的定義不同：

-   **Python**: `-10 % 3 = 2` (結果符號通常與**除數**相同)
-   **C/C++**: `-10 % 3 = -1` (結果符號通常與**被除數**相同)

為了符合題目的測資要求（題目是基於 C 語言行為），當 `n < 0` 且計算出的餘數 `> 0` 時，我們需要減去 `m` 來調整回 C 語言的結果。

> 簡單想法：在 Python 中，`%` 可以想成「加上多少個除數，才能變回正的倍數？」；而此題需要的是「直接對數值截斷」的餘數概念。
