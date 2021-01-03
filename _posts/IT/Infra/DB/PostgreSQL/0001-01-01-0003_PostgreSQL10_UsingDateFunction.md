---
layout: post
title: PostgreSQL - PostgreSQL10の日付メソッド使い方
categories: [Database]
tags: 
- Database
- PostgreSQL
comments: false
description:
author: J.ian
---

<input type="hidden" id="categoryName" value="Database" />
<input type="hidden" id="postedDate" value="2019-02-03" />

> PostgreSQLのメソッドの中で日付に関するメソッドに対して整理して見る

> ### PostgreSQLの日付メソッドの使用方法

___

#### 1) to_char
&nbsp;&nbsp;
**`to_char(`** 元データ, 変更するデータタイプ **`)`**     
&nbsp;&nbsp;&nbsp;&nbsp;
- 日付を文字、特定な形式で変更     

```postgresql

  -- 日付 select to_char(); or select * from to_char();
  
    to_char(current_timestamp, 'yyyy');     -- 2019, (timestamp -> varchar)
    to_char(current_timestamp, 'yyy');      -- 019, (timestamp -> varchar)
    to_char(current_timestamp, 'yy');       -- 19, (timestamp -> varchar)
    to_char(current_timestamp, 'y');        -- 9, (timestamp -> varchar)
    
    to_char(current_timestamp, 'month');    -- february
    to_char(current_timestamp, 'mon');      -- feb
    to_char(current_timestamp, 'mm');       -- 02
    
    to_char(current_timestamp, 'dd');       -- 03,（2019-02-03の日付）
    to_char(current_timestamp, 'd');        -- 1, 該当日付の曜日番号（日曜：1 ~ 土曜：6）
    to_char(current_timestamp, 'ddd');      -- 034, 該当日付の n/365（1月1日：01）
    to_char(current_timestamp, 'day');      -- sunday, 該当日付の曜日
    
    to_char(current_timestamp, 'hh');       -- 01, 該当日付の時間（12時）
    to_char(current_timestamp, 'hh24');     -- 13, 該当日付の時間（24時）
    
    to_char(current_timestamp, 'mi');       -- 50, 該当日付の分（13時50分の場合）
    to_char(current_timestamp, 'ss');       -- 50, 該当日付の秒
    
    to_char(current_timestamp, 'ww');       -- 05, 該当日付の週（何回目の週か？） 
```    
<br />

#### 2) extract
&nbsp;&nbsp; 
**`extract`** メソッド        
&nbsp;&nbsp;&nbsp;&nbsp;
日付の一部の情報を「double precision」タイプで変更して返還       

```postgresql

  extract(year from timestamp '2019-02-01 10:23:24');     --2,019.0000
  extract(month from timestamptz '2019-02-01 10:23:24');  --2.0000
  extract(day from date '2019-02-01 10:23:24');           --1.0000
```
<br />

#### 3) date_part
&nbsp;&nbsp;
**`date_part`** (要る情報, 日付)      
&nbsp;&nbsp;&nbsp;&nbsp;
日付の一部の情報を「double precision」タイプで変更して返還       

```postgresql

  date_part('year', timestamp '2019-02-01 10:23:24');     --2,019.0000
  date_part('month', timestamptz '2019-02-01 10:23:24');  --2.0000
  date_part('day', date '2019-02-01 10:23:24');           --1.0000
```
<br />

#### 4) interval
&nbsp;&nbsp; 
**`interval`**;      
&nbsp;&nbsp;&nbsp;&nbsp;
日付を算出      

```postgresql

      select current_timestamp - interval '1 day';      -- 1日前
      select current_timestamp + interval '2 day';      -- 2日後
      select current_timestamp - interval '1 day' * 3;  -- 3日前
      select current_timestamp - interval '2 days' * 5; -- 10日前
```
&nbsp;&nbsp;
day, days 区分せずに使用しても良い       

<br /><br />


___
