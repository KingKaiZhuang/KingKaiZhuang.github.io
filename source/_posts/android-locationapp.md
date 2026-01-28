---
layout: post
title: Android LocationApp
date: 2025-10-17
tags:
  - "location-app"
categories:
  - "android-app"
  - "kotlin"
top_img: /images/LocationApp.png
cover: /images/LocationApp.png
---

這是一個練習定位權限的App，我將重要的部分記錄下來。

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

```
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

- android.permission.INTERNET : 允許應用程式開啟**網路連線**

- android.permission.ACCESS\_COARSE\_LOCATION : 允許應用程式存取使用**粗略的位置**

- android.permission.ACCESS\_FINE\_LOCATION : 允許應用程式存取使用**精確的位置**

## LocationUtils.kt

hasLocationPermission function 回傳一個 `Boolean`→ `true` 或 `false`，代表有沒有定位權限。

```
class LocationUtils(val context: Context) {
    private val _fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(context)
<div></div>
    @SuppressLint("MissingPermission")
    fun requestLocationUpdates(viewModel: LocationViewModel) {
        val locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                locationResult.lastLocation?.let {
                    val location = LocationData(latitude = it.latitude, longitude = it.longitude)
                    viewModel.updateLocation(location)
                }
            }
        }
        val locationRequest = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY, 1000
        ).build()
        _fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            Looper.getMainLooper()
        )
    }
<div></div>
    fun hasLocationPermission(context: Context): Boolean {
        return ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
                &&
                ContextCompat.checkSelfPermission(
                    context,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
    }
<div></div>
    fun reverseGeocodeLocation(location: LocationData): String {
        // The Geocoder constructor expects a java.util.Locale
        val geocoder = Geocoder(context, Locale.getDefault())
        val coordinate = LatLng(location.latitude, location.longitude)
        val addresses: MutableList<Address>? =
            geocoder.getFromLocation(coordinate.latitude, coordinate.longitude, 1)
<div></div>
        return if (addresses?.isNotEmpty() == true) {
            addresses[0]?.getAddressLine(0) ?: "Address line not found"
        } else {
            "Address not found"
        }
    }
}
```

```
class LocationUtils(val context: Context) {
    private val _fusedLocationClient: FusedLocationProviderClient =
        LocationServices.getFusedLocationProviderClient(context)

    @SuppressLint("MissingPermission")
    fun requestLocationUpdates(viewModel: LocationViewModel) {
        val locationCallback = object : LocationCallback() {
            override fun onLocationResult(locationResult: LocationResult) {
                super.onLocationResult(locationResult)
                locationResult.lastLocation?.let {
                    val location = LocationData(latitude = it.latitude, longitude = it.longitude)
                    viewModel.updateLocation(location)
                }
            }
        }
        val locationRequest = LocationRequest.Builder(
            Priority.PRIORITY_HIGH_ACCURACY, 1000
        ).build()
        _fusedLocationClient.requestLocationUpdates(
            locationRequest,
            locationCallback,
            Looper.getMainLooper()
        )
    }

    fun hasLocationPermission(context: Context): Boolean {
        return ContextCompat.checkSelfPermission(
            context,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
                &&
                ContextCompat.checkSelfPermission(
                    context,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                ) == PackageManager.PERMISSION_GRANTED
    }

    fun reverseGeocodeLocation(location: LocationData): String {
        // The Geocoder constructor expects a java.util.Locale
        val geocoder = Geocoder(context, Locale.getDefault())
        val coordinate = LatLng(location.latitude, location.longitude)
        val addresses: MutableList<Address>? =
            geocoder.getFromLocation(coordinate.latitude, coordinate.longitude, 1)

        return if (addresses?.isNotEmpty() == true) {
            addresses[0]?.getAddressLine(0) ?: "Address line not found"
        } else {
            "Address not found"
        }
    }
}
```

```
private val _fusedLocationClient: FusedLocationProviderClient =
    LocationServices.getFusedLocationProviderClient(context)
```

```
private val _fusedLocationClient: FusedLocationProviderClient =
    LocationServices.getFusedLocationProviderClient(context)
```

這是 Google 提供的 **Fused Location Provider API**，能整合 GPS、Wi-Fi、藍牙與行動網路的定位來源，讓定位更準確且省電。`_fusedLocationClient` 用來執行「請求位置更新」、「停止更新」、「取得最後位置」等操作。

### requestLocationUpdates

```
@SuppressLint("MissingPermission")
fun requestLocationUpdates(viewModel: LocationViewModel) {
```

```
@SuppressLint("MissingPermission")
fun requestLocationUpdates(viewModel: LocationViewModel) {
```

⚠️ 注意：這裡用了 `@SuppressLint("MissingPermission")`，代表你**必須在呼叫這個函式前，確認已取得權限**（也就是前面 `LocationDisplay` 檢查的部分）。

意思是保證外層一定會先檢查 hasLocationPermission() 才會進來，所以不用再提醒我 MissingPermission。

這個函式會**每秒更新一次位置**（因為下面設定了 1000 毫秒），然後將新位置傳給你的 `LocationViewModel`。

```
val locationCallback = object : LocationCallback() {
    override fun onLocationResult(locationResult: LocationResult) {
        super.onLocationResult(locationResult)
        locationResult.lastLocation?.let {
            val location = LocationData(latitude = it.latitude, longitude = it.longitude)
            viewModel.updateLocation(location)
        }
    }
}
```

```
val locationCallback = object : LocationCallback() {
    override fun onLocationResult(locationResult: LocationResult) {
        super.onLocationResult(locationResult)
        locationResult.lastLocation?.let {
            val location = LocationData(latitude = it.latitude, longitude = it.longitude)
            viewModel.updateLocation(location)
        }
    }
}
```

當系統取得新的定位資訊時，會呼叫 `onLocationResult`。

`lastLocation` 是最新的 `Location` 物件（包含緯度與經度）。

```
package com.example.locationapp
<div></div>
data class LocationData(
    val latitude: Double,
    val longitude: Double
)
```

```
package com.example.locationapp

data class LocationData(
    val latitude: Double,
    val longitude: Double
)
```

`LocationData` 是我們定義的資料類別，用來包裝座標。

呼叫 `viewModel.updateLocation(location)` → 把資料傳給 ViewModel 更新 UI。

```
_fusedLocationClient.requestLocationUpdates(
    locationRequest,
    locationCallback,
    Looper.getMainLooper()
)
```

```
_fusedLocationClient.requestLocationUpdates(
    locationRequest,
    locationCallback,
    Looper.getMainLooper()
)
```

這行讓 app 持續監聽位置變化。

### hasLocationPermission

`LocationUtils` 要持有 `Context`，才能呼叫系統 API（如 `ContextCompat.checkSelfPermission`）來檢查權限。

return 這段是重點：`ContextCompat.checkSelfPermission()` 是Android官方提供的工具，用來檢查 App 是否擁有某個權限。它會回傳一個整數值（`PERMISSION_GRANTED` 或 `PERMISSION_DENIED`）。

這段程式碼的功能就像是你在檢查一個房間的門：

> 「門有沒有上鎖？如果鎖是開著的，就代表我可以進去。」
> 
> **`ContextCompat` (檢查員)：** 你可以把它想像成 Android 系統中的一位**通用檢查員**或**萬用工具箱**。它的工作就是確保你的程式碼在所有不同型號和版本的 Android 手機上都能正常運作（這就是 `Compat` 兼容性的意思）。
> 
> **`.checkSelfPermission()` (檢查方法)：** 這是檢查員專門用來**檢查特定權限狀態**的方法。
> 
> - **參數一 (`context`)：** 告訴檢查員「在哪個應用程式環境」下進行檢查。
> 
> - **參數二 (`Manifest.permission.ACCESS_FINE_LOCATION`)：** 告訴檢查員「要檢查哪一種權限」。

### 為什麼需要 `ContextCompat.checkSelfPermission()`？

我們不直接使用 `PackageManager.PERMISSION_GRANTED` 進行判斷，是因為 **`PackageManager.PERMISSION_GRANTED` 只是一個「結果代碼」（密碼）**，而 **`ContextCompat.checkSelfPermission()` 才是「執行檢查的動作」**。

### reverseGeocodeLocation

```
fun reverseGeocodeLocation(location: LocationData): String {
    val geocoder = Geocoder(context, Locale.getDefault())
    val coordinate = LatLng(location.latitude, location.longitude)
    val addresses: MutableList<Address>? =
        geocoder.getFromLocation(coordinate.latitude, coordinate.longitude, 1)
```

```
fun reverseGeocodeLocation(location: LocationData): String {
    val geocoder = Geocoder(context, Locale.getDefault())
    val coordinate = LatLng(location.latitude, location.longitude)
    val addresses: MutableList<Address>? =
        geocoder.getFromLocation(coordinate.latitude, coordinate.longitude, 1)
```

用 `Geocoder` 根據經緯度查詢地點名稱。`getFromLocation()` 會回傳一個地址列表（可能含國家、城市、街道）。

## MainActivity.kt

```
@Composable
fun MyApp(modifier: Modifier) {
    val context = LocalContext.current
    val locationUtils = LocationUtils(context)
    LocationDisplay(locationUtils = locationUtils, context = context)
}
```

```
@Composable
fun MyApp(modifier: Modifier) {
    val context = LocalContext.current
    val locationUtils = LocationUtils(context)
    LocationDisplay(locationUtils = locationUtils, context = context)
}
```

```
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val viewModel: LocationViewModel = viewModel()
            LocationAppTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MyApp(viewModel = viewModel,modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}
```

```
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            val viewModel: LocationViewModel = viewModel()
            LocationAppTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MyApp(viewModel = viewModel,modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}
```

**`Context`：** 是一個核心的 Android 系統類別，它提供了應用程式全域資訊，例如資源、資料庫、文件系統路徑，以及存取系統服務（如定位服務）的管道。

**`LocalContext.current`：** 這是 Jetpack Compose 框架提供的一個 **CompositionLocal**。它用於在可組合函數中**存取** Android 應用程式的 **`Context`** 物件。

`LocationDisplay(locationUtils = locationUtils, context = context)` 這行程式碼的作用是**調用**一個名為 `LocationDisplay` 的 **Compose UI 元件**，向它傳遞所需的資料和環境依賴。

```
@Composable
fun LocationDisplay(
    locationUtils: LocationUtils,
    viewModel: LocationViewModel,
    context: Context
) {
    val location = viewModel.location.value
    
    val address = location?.let {
        locationUtils.reverseGeocodeLocation(location)
    }
<div></div>
    val requestPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions(),
        onResult = { permissions ->
            if (permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
                && permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
            ) {
                // 擁有 location 權限
                locationUtils.requestLocationUpdates(viewModel = viewModel)
<div></div>
            } else {
                // 要求權限
                val rationaleRequired = ActivityCompat.shouldShowRequestPermissionRationale(
                    context as MainActivity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) || ActivityCompat.shouldShowRequestPermissionRationale(
                    context as MainActivity,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )
<div></div>
                if (rationaleRequired) {
                    Toast.makeText(
                        context,
                        "Location Permission is required for this feature to work",
                        Toast.LENGTH_LONG
                    ).show()
                } else {
                    Toast.makeText(
                        context,
                        "Location Permission is required, Please enable from settings",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        }
    )
<div></div>
    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        if(location != null) {
            Text("Address: ${location.latitude} ${location.longitude} \n $address ")
        }
        Text(text = "Location not available")
<div></div>
        Button(onClick = {
            if (locationUtils.hasLocationPermission(context)) {
                locationUtils.requestLocationUpdates(viewModel)
            } else {
                requestPermissionLauncher.launch(
                    arrayOf(
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                    )
                )
            }
        }) {
            Text(text = "Get Location")
        }
    }
}
```

```
@Composable
fun LocationDisplay(
    locationUtils: LocationUtils,
    viewModel: LocationViewModel,
    context: Context
) {
    val location = viewModel.location.value
    
    val address = location?.let {
        locationUtils.reverseGeocodeLocation(location)
    }

    val requestPermissionLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.RequestMultiplePermissions(),
        onResult = { permissions ->
            if (permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
                && permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
            ) {
                // 擁有 location 權限
                locationUtils.requestLocationUpdates(viewModel = viewModel)

            } else {
                // 要求權限
                val rationaleRequired = ActivityCompat.shouldShowRequestPermissionRationale(
                    context as MainActivity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                ) || ActivityCompat.shouldShowRequestPermissionRationale(
                    context as MainActivity,
                    Manifest.permission.ACCESS_COARSE_LOCATION
                )

                if (rationaleRequired) {
                    Toast.makeText(
                        context,
                        "Location Permission is required for this feature to work",
                        Toast.LENGTH_LONG
                    ).show()
                } else {
                    Toast.makeText(
                        context,
                        "Location Permission is required, Please enable from settings",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        }
    )

    Column(
        modifier = Modifier.fillMaxSize(),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        if(location != null) {
            Text("Address: ${location.latitude} ${location.longitude} \n $address ")
        }
        Text(text = "Location not available")

        Button(onClick = {
            if (locationUtils.hasLocationPermission(context)) {
                locationUtils.requestLocationUpdates(viewModel)
            } else {
                requestPermissionLauncher.launch(
                    arrayOf(
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION
                    )
                )
            }
        }) {
            Text(text = "Get Location")
        }
    }
}
```

主要公能：顯示一個文字 + 按鈕，並處理按下按鈕後檢查或請求定位權限。

contract = ActivityResultContracts.RequestMultiplePermissions()

表示這個 launcher 可以一次請求多個權限（這裡是 coarse + fine）。

`onResult = { permissions -> ... }`

系統對話框關閉後，會回傳使用者是否授權。

```
if (permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
    && permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
) {
    // 已擁有定位權限
} else {
    // 尚未取得權限，顯示提示
}
```

```
if (permissions[Manifest.permission.ACCESS_COARSE_LOCATION] == true
    && permissions[Manifest.permission.ACCESS_FINE_LOCATION] == true
) {
    // 已擁有定位權限
} else {
    // 尚未取得權限，顯示提示
}
```

若兩個權限都有允許，目前就什麼都不做；否則，進入「沒有權限」的分支。

如果沒權限 → 顯示提示 Toast

```
val rationaleRequired = ActivityCompat.shouldShowRequestPermissionRationale(
    context as MainActivity,
    Manifest.permission.ACCESS_FINE_LOCATION
) || ActivityCompat.shouldShowRequestPermissionRationale(
    context as MainActivity,
    Manifest.permission.ACCESS_COARSE_LOCATION
)
```

```
val rationaleRequired = ActivityCompat.shouldShowRequestPermissionRationale(
    context as MainActivity,
    Manifest.permission.ACCESS_FINE_LOCATION
) || ActivityCompat.shouldShowRequestPermissionRationale(
    context as MainActivity,
    Manifest.permission.ACCESS_COARSE_LOCATION
)
```

shouldShowRequestPermissionRationale(…)

這是 Android 的 API，用來判斷：

- 使用者曾拒絕過權限（但沒勾「不再詢問」 → 回傳 `true`

- 使用者勾了「不再詢問」或 第一次詢問 → 回傳 `false`

```
if (rationaleRequired) {
    Toast.makeText(context, "Location Permission is required for this feature to work", Toast.LENGTH_LONG).show()
} else {
    Toast.makeText(context, "Location Permission is required, Please enable from settings", Toast.LENGTH_LONG).show()
}
```

```
if (rationaleRequired) {
    Toast.makeText(context, "Location Permission is required for this feature to work", Toast.LENGTH_LONG).show()
} else {
    Toast.makeText(context, "Location Permission is required, Please enable from settings", Toast.LENGTH_LONG).show()
}
```

![](/images/image-1.png)

![](/images/image.png)

![](/images/螢幕擷取畫面-2025-10-19-214356.png)

## LocationViewModel.kt

```
package com.example.locationapp
<div></div>
import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
<div></div>
class LocationViewModel: ViewModel() {
    private val _location = mutableStateOf<LocationData?>(null)
    val location: State<LocationData?> = _location
<div></div>
    fun updateLocation(newLocation: LocationData) {
        _location.value = newLocation
    }
<div></div>
}
```

```
package com.example.locationapp

import androidx.compose.runtime.State
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel

class LocationViewModel: ViewModel() {
    private val _location = mutableStateOf<LocationData?>(null)
    val location: State<LocationData?> = _location

    fun updateLocation(newLocation: LocationData) {
        _location.value = newLocation
    }

}
```

```
private val _location = mutableStateOf<LocationData?>(null)
```

```
private val _location = mutableStateOf<LocationData?>(null)
```

mutableStateOf 它包裝了一個變數，當值改變時，Compose UI 會**自動重新組合（recompose）**。

`LocationData?` → 泛型裡面的 `?` 代表可以是 `null`，表示「可能還沒取得位置」。

`_location` 是私有的可變，`location` 是公開的唯讀。

```
fun updateLocation(newLocation: LocationData) {
    _location.value = newLocation
}
```

```
fun updateLocation(newLocation: LocationData) {
    _location.value = newLocation
}
```

當 `LocationUtils` 拿到新座標後，會呼叫updateLocation更新座標。
