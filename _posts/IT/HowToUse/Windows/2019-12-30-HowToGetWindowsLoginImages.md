---
layout: post
title: Windows10 - ログイン画面のイメージ（画像）取得方法
categories: [HowToUse]
tags: 
- HowToUse
- Windows
- Wallpaper
comments: false
description:
author: J.ian
---
<input type="hidden" id="categoryName" value="HowToUse" />

> Windows10のログイン画面のイメージ（画像）を取得する方法について調べてみる

> ### Windows10のログイン画面のイメージ（画像）取得する

___


#### - ログイン画面のイメージがあるフォルダーに移動する
<br />

&nbsp; 
 **`%LocalAppData%\Packages\Microsoft.Windows.ContentDeliveryManager_cw5n1h2txyewy\LocalState\Assets`**      
<br />

&nbsp;&nbsp; 
上のパスをアドレスバーにコピーしてログイン画面のイメージが保存されている所に移動する     
&nbsp;&nbsp; 
上のパスに移動すると拡張子がないファイルがたくさんあるが、このファイルが今まで保存されたログイン画面のイメージである     
![windowsLoginImage](/resources/images/HowToUse/Windows/windowsLoginImagePath.PNG "windowsLoginImagePath")      
<br />

&nbsp;&nbsp; 
このファイルの拡張子をjpgまたはpngに変更してくれるとさっそくイメージを見える      

<br /> <br /> 


#### ※ 拡張子を一括に変更する方法

&nbsp;&nbsp; 
①上の全てのファイルを **他の任意フォルダーでコピー** しよう      
&nbsp;&nbsp; 
②コピーしたフォルダーで **`File - コマンドプロンプト開く - 管理者権限に開く`** を押下する     
&nbsp;&nbsp; 
③実行されたコマンドプロンプト画面で **`ren * *.jpg  `** を入力する     
&nbsp;&nbsp; 
④全てのファイルが「jpg」拡張子に変更される      


<br /><br />

___