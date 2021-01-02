---
layout: post
title: PostgreSQL - PostgreSQL10 Alter文
categories: [Database]
tags: 
- Database
- PostgreSQL
comments: true
description:
author: J.ian
---

<input type="hidden" id="categoryName" value="Database" />
<input type="hidden" id="postedDate" value="2019-01-06" />

> PostgreSQLのAlter文に対する整理をして見る

> ### PostgreSQLのALTER文整理

___

#### 1. Table Column 追加     

**`ALTER TABLE`** テーブル名      
&nbsp;&nbsp;&nbsp;&nbsp; **`ADD COLUMN`** カラム名 データタイプ (その他の属性);
```postgresql
    alter table inventory
        add column a_qty NUMERIC(10,0),
        add column b_qty NUMERIC(10,0) DEFAULT 0;
```
<br /><br />


#### 2. Table Column 除去

**`ALTER TABLE`** テーブル名       
&nbsp;&nbsp;&nbsp;&nbsp; **`DROP COLUMN`** カラム名;
```postgresql
    alter table inventory
        drop column a_qty,
        drop column b_qty;
```
<br /><br />


#### 3. TABLE Column名変更

**`ALTER TABLE`** テーブル名        
&nbsp;&nbsp;&nbsp;&nbsp; **`RENAME COLUMN`** 元カラム名 **`TO`** 新カラム名;
```postgresql
    alter table inventory
        rename column a_qty to c_qty;
```
<br /><br />


#### 4. TABLE Columnのデータタイプ変更

**`ALTER TABLE`** テーブル名      
&nbsp;&nbsp;&nbsp;&nbsp;**`ALTER COLUMN`** カラム名 **`TYPE`** 変更するデータタイプ;
```postgresql
    alter table inventory
        alter column a_qty type NUMERIC(100,0),
        alter column b_qty type VARCHAR(30),
        alter column c_qty type VARCHAR(30);
```
<br /><br />


#### 5. TABLE Columnのデフォルト設定及び修正

**`ALTER TABLE`** テーブル名       
&nbsp;&nbsp;&nbsp;&nbsp; **`ALTER COLUMN`** カラム名 **`SET DEFAULT`** デフォルト値;
```postgresql
    alter table inventory
        alter column b_qty set default 'empty';
```
<br /><br />


#### 6. TABLE Columnのデフォルト除去

**`ALTER TABLE`** テーブル名         
&nbsp;&nbsp;&nbsp;&nbsp; **`ALTER COLUMN`** カラム名 **`DROP DEFAULT`**;
```postgresql
    alter table inventory
        alter column b_qty drop default;
```
<br /><br />


#### 7. TABLE Column not null 設定
**`ALTER TABLE`** テーブル名       
&nbsp;&nbsp;&nbsp;&nbsp; **`ALTER COLUMN`** カラム名 **`SET NOT NULL`**;
```postgresql
    alter table inventory
        alter column c_qty set not null;
```
<br /><br />


#### 8. TABLE Column not null 設定除去

**`ALTER TABLE`** テーブル名         
&nbsp;&nbsp;&nbsp;&nbsp; **`ALTER COLUMN`** カラム名 **`DROP NOT NULL`**;
```postgresql
    alter table inventory
        alter column c_qty drop not null;
```
<br /><br />


#### 9. TABLE 複合主キー削除

&nbsp;複合主キー（主キーが2つのテーブル）の場合、主キーの制約条件を別々削除した後、再び１つの主キーを指定して、制約条件を設定してくれる     

&nbsp;&nbsp;&nbsp;&nbsp;
1) **`ALTER TABLE`** テーブル名         
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
**`DROP CONSTRAINT`** 制約条件名;     

&nbsp;&nbsp;&nbsp;&nbsp;
2) **`ALTER TABLE`** テーブル名          
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
**`ADD CONSTRAINT`** 制約条件名 **`PRIMARY KEY`**(主キーで設定するカラム名);      

```postgresql
    alter table inventory
        drop constraint inventory_pkey;

    alter table inventory
        add constraint inventory_pkey primary key(inventory_sn);
```
<br /><br />

___
