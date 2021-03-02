---
layout: post
title: Java - Listの重複を除外させる方法（StreamのDistinct）
categories: [Programming]
tags: 
- Programming
- Java
- Stream
- Distict
comments: false
description:
author: J.ian
date:   2020-05-10
---

<input type="hidden" id="categoryName" value="Programming" />
<input type="hidden" id="postedDate" value="2020-05-10" />

> JAVA **`Streamの「Distinct」を利用`** しListの重複値を持っているインスタンスを除外させる。

### 1. 基本データ形式のクラス（Integer, BigDecimal 等）及び「String」の重複値除外
&nbsp;&nbsp; 基本データ形式のクラス（Integer, BigDecimal 等）と「String」の場合「Distinct」を利用して簡単に除外可能    
 
```java

    // List生成
    List<String> strList = new ArrayList<>();
    strList.add("mac");
    strList.add("windows");
    strList.add("ubuntu");
    strList.add("mac");
    
    // 重複値「mac」を除外
    strList.stream()
            .distinct()
            .forEach(f -> System.out.println(f));
    
    // [Result] 
        mac
        windows
        ubuntu
```
       
      

### 2. カスタムクラスの重複値除外
&nbsp;&nbsp; カスタムクラスの場合、「Object」クラスを継承した **`「hashCode」メソッドと「equals」メソッドをOverride`** した後「Distinct」を使用しないといけない      
&nbsp;&nbsp; ※ ***Distinctメソッドは実際に「hashCode」メソッドと「eqauls」メソッドを利用し重複を除外する***      

```java

    // カスタムクラス
    public class Student {

        private String name;
        private String className;
        private String telNum;

        // Getter Setter 省略

        // 重複値を比べるフィルドの「hashCode」を返還するようにオーバライド
        @Override
        public int hashCode() {

            return this.className.hashCode();
        }

        // 重複値を比べるフィルドの「hashCode」を返還するようにオーバライド
        @Override
        public boolean equals(Object obj) {
            
            return this.className.equals(((Student) obj).className);
        }
    }
}
    
```
       
      

