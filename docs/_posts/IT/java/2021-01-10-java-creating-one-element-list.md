---
layout: post
title: "[Java] Sizeが 1 のリストを作り方"
categories: [Java]
tags:
  - programming
  - java
  - lists
  - Arrays.asList
  - Collections.singletonList
author: J.ian
last_modified_at: 2021-01-10T13:56:52-05:00
---

> `Arrays.asList()`と`Collections.singletonList()`メソッドを使って長さが「1」のListを作ってみましょう

たまにListタイプのパラメーターが要るメソッドを使う場合があります。

データが1つのみですが、メソッドのパラメーターがListタイプなのでエレメントが1つのリストを作って使いました。

このような場合、Arrays.asList()メソッドをよく使いましたが、常にIntelliJに警告が出てきました。

警告内容は現在使っている「Arrays.asList()」メソッドより「Collections.singletonList()」メソッドがメモリ効率面で良いという内容ですので、

今回、2つのメソッドの違いについて調べて見ました。

> 変更可能Mutable(Arrays.asList()) **vs** 変更不可Immutable(Collections.singletonList())

## 1. Arrays.asList();
- java.util.Arrays
- 複数のパラメーターを用いてArrayListを作って出すメソッド
```java
    public static <T> List<T> asList(T... a) {
        return new ArrayList<>(a);
    }
    
    ... 割愛 ...

    private static class ArrayList<E> extends AbstractList<E>
          implements RandomAccess, java.io.Serializable {
    
        ... 割愛 ...
    
        private final E[] a;

        ArrayList(E[] array) {
            a = Objects.requireNonNull(array);
        }
    
        ... 割愛 ...
    }
```

**Arrays.asList()**は複数のパラメーターをArrayListで作ります。(※ java.util.ArrayList クラスと異なるクラスです。)

なので、ArrayListで作りたいと思うデータが1個でも100個でも区分せずに行います。

データの数量と関わらず同一な方法で作りますのでパラメーターの個数に該当する長さの配列を作ってListを生成させます。

ArrayListと同様な属性を持っているのでリストの追加、更新、削除ができます。

<br />

---

<br />

## 2. Collections.singletonList();
- java.util.Collections
- 1つのパラメーターを用いてListインタフェースを実装したクラスを出すメソッド
```java
    public static <T> List<T> singletonList(T o) {
        return new SingletonList<>(o);
    }
    
    ... 割愛 ...

    private static class SingletonList<E>
        extends AbstractList<E>
        implements RandomAccess, Serializable {
    
        ... 割愛 ...
    
        private final E element;

        SingletonList(E obj) {
            element = obj;
        }

        public int size() {
            return 1;
        }

        public E get(int index) {
            if (index != 0)
              throw new IndexOutOfBoundsException("Index: "+index+", Size: 1");
            return element;
        }
    
        ... 割愛 ...
    }
```

**Collections.singletonList()**は単に1つのパラメーターを要ります。

そして ___SingletonList___ というListインタフェースを実装したクラスを生成させ返還します。

配列を使いませんが、Listインタフェースの実装メソッドや定数を実装しましたのでListということができます。

(※ size()を見ると固定に「1」を出すことを確認できます。)

配列を使いませんのでクラスを生成する際に要るメモリが少ないです。

なので長さが「1」のリストを生成する場合はもっと効率的な方法です。

