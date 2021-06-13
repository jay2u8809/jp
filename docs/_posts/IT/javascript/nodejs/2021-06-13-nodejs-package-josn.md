---
layout: post
title: "[NodeJs] package.jsonとは?"
categories: [NodeJs]
tags:
  - programming
  - nodejs
  - npm
  - package.json
author: J.ian
last_modified_at: 2021-06-13
---

> `package.json`はプロジェクトのメタデータを保存するファイルです。

すべてのnpmパッケージは「package.json」ファイルを *プロジェクトルート* に含めています。

この **package.json** はどんなファイルかまたなぜ使っているか？

npmはプロジェクトに要る様々なモジュールを管理するためのプログラムです。

プロジェクトごとに使用するモジュールが異なるので、どこかに現状のモジュール情報を記録して置く必要があります。

例えば、Aプロジェクトには Module1, Module2, Module3, Module4を使っていてB プロジェクトには Module2, Module3を使っていると想定します。

Aプロジェクトのルートに存在する「package.json」には Module1, Module2, Module3, Module4 が記録されていて、 Bプロジェクトのルートに存在している「package.json」には Module2, Module3が記録されています。

npmは各プロジェクトの「package.json」を確認して必要なモジュールをダウンロード、インストールします。

package.jsonを通じて常に同一な開発環境及び運用環境を作られます。

このようなモジュールに関する情報以外、プロジェクトに関する多様なメタデータを保存して置くファイルが **package.json** です。

<br />

---

<br />

## package.json の生成
 - 下のコマンドを通じて package.json ファイルを生成します。
```shell
    $ npm init
```

## モジュールインストール
 - `--save` オプションを使用するとインストールしたモジュールの情報が package.json に登録されます。
 - **node_modules** フォルダーが生成され、インストールしたモジュールが保存されます。
 - **node_modules** フォルダーが削除されても package.json ファイルがあれば `npm install` コマンドで復元できます。
```shell
    $ npm install --save ejs          // npm install ejs --save
    $ npm install --save ejs@2        // install the latest version of 2
    $ npm install --save ejs@2.3      // install the latest version of 2.3
    $ npm install --save ejs@2.4.1    // install version 2.4.1 
```

## モジュール削除
```shell
    $ npm uninstall --save ejs        // npm uninstall ejs --save
```

<br />

---

<br />

## package.json 
```json
{
  "name": "プロジェクト名",
  "version": "1.0.0",
  "description": "プロジェクト説明",
  "keywords": [],
  "main": "index.js",
  "config": {
    "port": "3080"
  },
  "scripts": {
    "start": "echo \"Start: Project Start \" && exit 0",
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npm build",
    "clean": "rm -rf node_modules",
    "reinstall": "npm run clean && npm install",
    "rebuild": "npm run clean && npm install && npm run build"
  },
  "author": "作成者",
  "license": "ライセンス",
  "type": "module",
  "dependencies": {
    "body-parser": "^1.19.0",
    "connect-multiparty": "^2.2.0",
    "cookie-parser": "~1.4.4",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "morgan": "~1.9.1"
  },
  "devDependencies": {
    "body-parser": "^1.19.0",
    "connect-multiparty": "^2.2.0",
    "cookie-parser": "~1.4.4",
    "express": "^4.17.1",
    "express-session": "^1.17.2",
    "morgan": "~1.9.1"
  }
}
```

### name と version
```json
    "name": "プロジェクト名",
    "version": "1.0.0",
```
 - 必須項目、各パッケージの固有性を判別
 - name は 214字未満、点(.) 又は下線(_)で始めること不可、大文字を含めることができません。
 - name は urlの一部であり、コマンドラインの引数であり、フォルダー名です。

### description と keyowrd
```json
    "description": "プロジェクト説明",
    "keywords": [],
```
 - npm search で検索されたリストに表示されている項目であり、ユーザーたちがパッケージを調べて使用することに役に立ちます。

### main
```json
    "main": "index.js",
```
 - プログラムが始まるモジュールのIDです。
 - fooというパッケージがあれば、このパッケージをインストールした後、require('foo');を実行する際にmainで指定したモジュールのexportsオブジェクトが返還されます。

### config
```json
    "config": {
        "port": "3080"
    },
```
 - パッケージのスクリプトで使える設定情報です。
 - "start" スクリプトを実行する際に npm_package_config_portを参照します。

### dependencies
```json
    "dependencies": {
        "body-parser": "^1.19.0",
        "connect-multiparty": "^2.2.0",
        "cookie-parser": "~1.4.4",
        "express": "^4.17.1",
        "express-session": "^1.17.2",
        "morgan": "~1.9.1"
    },
```
 - プロジェクトのdependencies情報です。
 - tarball 又は git Urlでも指定ができます。
 - テスト関連モジュールやTransfiler関連モジュール、開発段階のみ必要なモジュールは除去するようにします。
 (※ devDependenciesにインストール)
 - 運用環境に必要なパッケージデータ
 - version 指定方式
   *  [ * ]        : 最新バージョンインストール
   *  [ > 1.0.0]   : 1.0.0 より高いバージョンインストール
   *  [ >= 1.0.0]  : 1.0.0 より高い又は同じバージョンインストール
   *  [ < 1.0.0]   : 1.0.0 より低いバージョンインストール
   *  [ <= 1.0.0]  : 1.0.0 より低い又は同じバージョンインストール
   *  [ = 1.0.0]   : 1.0.0 バージョンインストール
   *  [ ^1.0.0]    : 1.0.0 バージョンと合わせるバージョンインストール(1.0.0 以上 2.0.0 未満の間で最新バージョン)
   *  [ ~1.0.0]    : 1.0.0 バージョンと似ているバージョンインストール

### devDependencies
```json
    "devDependencies": {
        "body-parser": "^1.19.0",
        "connect-multiparty": "^2.2.0",
        "cookie-parser": "~1.4.4",
        "express": "^4.17.1",
        "express-session": "^1.17.2",
        "morgan": "~1.9.1"
    },
```
 - パッケージテスト及び開発段階のみ必要なモジュールを指定します。

<br />

---

<br />

## package-lock.json ファイルとは?

package.jsonにはバージョン情報を保存する際に `version range`を使用します。

version rangeは特定なバージョンではなくバージョンの _範囲_ を意味しています。

たまに npm install を進行しても他の node_modulesが生成される場合があります。

> 1) npm バージョンが異なる場合     
2) version rangeにちゃんとバージョンを明示しない場合      
3) パッケージが新しいバージョンがリリースされた場合

package-lock.json は package.jsonが更新されたり node_modulesの仕組みが変更される場合、当時のdependenciesに対する情報を基準で自動に生成されます。

また、 package-lock.jsonが存在している場合、 package.jsonを利用せずに node_modulesを構成します。

けっきょく、同一な node_modulesを生成するようにして同じdependenciesを保証するファイルです。

### npm ci コマンド
```shell
    $ npm ci
```
 - npm install コマンドは package.jsonの dependenciesと devDependenciesを基準でモジュールをインストールします。
 - npm ci コマンドは package.jsonより package-lock.jsonを基準でインストールします。
 - 2つのファイルのモジュールのバージョンが異なる場合、 package-lock.jsonを基準で package.jsonを修正し明示されない部分でエラーを発生させますので Applcation 管理の安定性が高いです。

<br />

---

<br />
