---
layout: post
title: PostgreSQL - PostgreSQL10 データタイプ変更メソッドの使い方
categories: [Database]
tags: 
- Database
- PostgreSQL
- SQL
comments: false
description:
author: J.ian
date:   2019-02-03
---

<input type="hidden" id="categoryName" value="Database" />
<input type="hidden" id="postedDate" value="2019-02-03" />

> PostgreSQLのメソッドの中でデータタイプを変更させるメソッドに対して整理して見る

> ### PostgreSQLのデータタイプ変更メソッドの使用方法

___


### データタイプ（Data Type）を変更させるメソッド     
<br />

#### 1) CAST     
&nbsp;&nbsp; ・ **`CAST`** (元データ **`AS`** 変更させるデータタイプ)      
```postgresql
    CAST(123.00000 AS integer);   -- 123 (double precision -> integer)
    CAST('1234' AS numeric);      -- 1,234 (varchar -> numeric)
    CAST(12302 AS vachar);        -- 12302 (integer -> varchar)

    -- 例)    
        select CAST(123.00000 AS integer);
        select * from CAST(123.00000 AS integer);
```
<br />

#### 2) ::     
&nbsp;&nbsp; ・ 元データ **`::`** 変更させるデータタイプ       
```postgresql
    123.00000::integer;   -- 123 (double precision -> integer)
    '1234'::numeric;      -- 1,234 (varchar -> numeric)
    12302::vachar;        -- 12302 (integer -> varchar)
    
    -- 例)
        select 123.00000::integer;
```
<br />

#### 3) to_char     
&nbsp;&nbsp; ・ **`to_char(`** 元データ, 変更させるデータタイプ **`)`**       
&nbsp;&nbsp;&nbsp;&nbsp; - 数字を文字、特定な形式で変更      
```postgresql
  -- 数字 
    to_char(12345, '999,999');        -- 12,345
    to_char(12345, '999,999.99');     -- 12,345.00
    to_char(-12345, '999,999PR');     -- <12,345>, 負数（マイナス）の場合、<> で表示
    to_char(45, 'rn');                -- xlv, 数字をローマ字に表示
    to_char(12345, '999,999s');       -- 12,345+ (負数 正数 表示)
    to_char(12345, 's999,999');       -- +12,345 (負数 正数 表示) 
```

<br /><br />


___
