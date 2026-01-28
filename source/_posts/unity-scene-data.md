---
layout: post
title: Unity 場景切換以及 Data 共享
date: 2025-12-04
tags:
categories:
  - "unity"
top_img: /images/unity-data-scene.png
cover: /images/unity-data-scene.png
---

這一篇文章主要是想分享 Unity的場景切換，那切換到不同的場景，要怎麼樣使用上一個場景所帶來的資料。

## SongSelect Scene

![](/images/CleanShot-2025-12-04-at-10.55.31.png)

按下Start按鈕開始，要把資料帶到下一個遊戲頁面。

![](/images/CleanShot-2025-12-04-at-10.56.41.png)

## MusicData.cs

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
<div></div>
[CreateAssetMenu(fileName = "MusicData", menuName = "Rhythm/MusicData")]
public class MusicData : ScriptableObject
{
    public string musicName;
    public string author;
    public AudioClip audioClip;
    public Sprite coverImage;
    public int bpm;
    public float length;
}
```

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[CreateAssetMenu(fileName = "MusicData", menuName = "Rhythm/MusicData")]
public class MusicData : ScriptableObject
{
    public string musicName;
    public string author;
    public AudioClip audioClip;
    public Sprite coverImage;
    public int bpm;
    public float length;
}
```

## SongDetailUI.cs

```
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
<div></div>
public class SongDetailUI : MonoBehaviour
{
    public Image coverImage;
    public TMPro.TextMeshProUGUI titleText;
    public TMPro.TextMeshProUGUI artistText;
    public TMPro.TextMeshProUGUI infoText;
    private MusicData current;
<div></div>
    public void ShowMusic(MusicData music)
    {
        current = music;
        // 將音樂資料帶入右邊的detail UI
        coverImage.sprite = music.coverImage;
        titleText.text = music.musicName;
        artistText.text = music.author;
        infoText.text = $"BPM: {music.bpm}  Length: {music.length}";
    }
<div></div>
    public void Btn_Play() {
        if (current == null) {
            Debug.LogError("沒有選擇歌曲，無法開始遊戲");
            return;
        }
        // 將音樂存到GameData
        GameData.selectedMusic = current;
        SceneManager.LoadScene("GameScene");
    }
}
```

```
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class SongDetailUI : MonoBehaviour
{
    public Image coverImage;
    public TMPro.TextMeshProUGUI titleText;
    public TMPro.TextMeshProUGUI artistText;
    public TMPro.TextMeshProUGUI infoText;
    private MusicData current;

    public void ShowMusic(MusicData music)
    {
        current = music;
        // 將音樂資料帶入右邊的detail UI
        coverImage.sprite = music.coverImage;
        titleText.text = music.musicName;
        artistText.text = music.author;
        infoText.text = $"BPM: {music.bpm}  Length: {music.length}";
    }

    public void Btn_Play() {
        if (current == null) {
            Debug.LogError("沒有選擇歌曲，無法開始遊戲");
            return;
        }
        // 將音樂存到GameData
        GameData.selectedMusic = current;
        SceneManager.LoadScene("GameScene");
    }
}
```

## Button 觸發轉場

在Start按鈕定義的事件

    ```
    public void Btn_Play() {
        if (current == null) {
            Debug.LogError("沒有選擇歌曲，無法開始遊戲");
            return;
        }
        // 將音樂存到GameData
        GameData.selectedMusic = current;
        SceneManager.LoadScene("GameScene");
    }
```

```
    public void Btn_Play() {
        if (current == null) {
            Debug.LogError("沒有選擇歌曲，無法開始遊戲");
            return;
        }
        // 將音樂存到GameData
        GameData.selectedMusic = current;
        SceneManager.LoadScene("GameScene");
    }
```

在另外一個遊戲場景，已經可以聽到點擊的對應的資料音樂。

透過 MusicData music = GameData.selectedMusic; 抓取剛剛的音樂。

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
<div></div>
public class GameMusicPlayer : MonoBehaviour
{
    private void Start() {
        MusicData music = GameData.selectedMusic;
        if (music == null) {
            Debug.LogError("沒有選擇歌曲，無法開始遊戲");
            return;
        }
        // 抓到全域的AudioSource
        AudioSource audio = GetComponent<AudioSource>();
        audio.clip = music.audioClip;
        audio.Play();
<div></div>
        Debug.Log("開始播放：" + music.musicName);
    }
}
```

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameMusicPlayer : MonoBehaviour
{
    private void Start() {
        MusicData music = GameData.selectedMusic;
        if (music == null) {
            Debug.LogError("沒有選擇歌曲，無法開始遊戲");
            return;
        }
        // 抓到全域的AudioSource
        AudioSource audio = GetComponent<AudioSource>();
        audio.clip = music.audioClip;
        audio.Play();

        Debug.Log("開始播放：" + music.musicName);
    }
}
```

成功取得音樂

![](/images/CleanShot-2025-12-04-at-11.02.07.png)

以上就是轉場還有資料怎麼使用的一個概略展示。
