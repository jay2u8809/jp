---
layout: post
title: "[Java] Size가 1인 리스트를 만드는 방법"
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

> `Arrays.asList()` 와  `Collections.singletonList()` 메소드를 사용해 길이가 1인 List를 만들어 보자

가끔 List 타입의 파라미터를 필요로 하는 메소드를 사용해야 할 때가 있다.

데이터가 1개임에도 메소드의 파라미터가 List 타입이기 때문에 종종 요소가 1개인 리스트를 만들어 사용했다.

이런 경우마다 Arrays.asList() 메소드를 자주 사용했는데 항상 IntelliJ에서 경고가 떴었다. 

경고 내용인 즉, 현재 사용하고 있는 메소드 Arrays.asList()보다 Collections.singletonList()가 메모리 효율면에서 좋다는
내용이었는데, 이번 기회를 통해 2개의 메소드가 어떤 차이가 있는지 알아 보았다.

> 변경가능Mutable(Arrays.asList()) **vs** 변경불가Immutable(Collections.singletonList())

## 1. Arrays.asList();
- java.util.Arrays
- 가변매개변수를 이용해 ArrayList를 만들어 반환하는 메소드
```java
    public static <T> List<T> asList(T... a) {
        return new ArrayList<>(a);
    }
    
    ... 생략 ...

    private static class ArrayList<E> extends AbstractList<E>
          implements RandomAccess, java.io.Serializable {
    
        ... 생략 ...
    
        private final E[] a;

        ArrayList(E[] array) {
            a = Objects.requireNonNull(array);
        }
    
        ... 생략 ...
    }
```

**Arrays.asList()**는 다수의 파라미터를 ArrayList로 만든다.(※ java.util.ArrayList 클래스와 다르다)

따라서 ArrayList로 만들고 싶은 데이터가 1개이거나 100개이거나 구분하지 않는다.

데이터의 갯수와 상관없이 동일한 방식으로 만들기 때문에 가변매개변수의 수에 해당하는 길이의 배열을 만들어 List를 생성한다.

ArrayList와 동일한 속성을 가지기 때문에 리스트의 추가, 수정, 삭제가 가능하다.

<br />

---

<br />

## 2. Collections.singletonList();
- java.util.Collections
- 1개의 파라미터를 이용해 List 인터페이스를 구현한 객체를 반환하는 메소드
```java
    public static <T> List<T> singletonList(T o) {
        return new SingletonList<>(o);
    }
    
    ... 생략 ...

    private static class SingletonList<E>
        extends AbstractList<E>
        implements RandomAccess, Serializable {
    
        ... 생략 ...
    
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
    
        ... 생략 ...
    }
```

**Collections.singletonList()**는 단 1개의 파라미터를 필요로 한다.

그리고 ___SingletonList___ 라는 List 인터페이스를 구현한 객체를 생성하여 반환한다.

배열을 사용하지는 않지만 List 인터페이스의 구현체들을 구현하였기 때문에 List라고 할 수 있다.

(※ size()를 보면 고정값으로 "1"을 반환하는 것을 볼 수 있다.)

배열을 사용하지 않기 때문에 객체를 생성할 때 필요한 메모리가 적고 길이가 1인 리스트를 생성해야 할 때는

좀더 효율적이라고 할 수 있다.

