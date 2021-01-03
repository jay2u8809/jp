---
layout: post
title: PostgreSQL - PostgreSQL10 メソッド（Function, Stored Procedure）作り方
categories: [Database]
tags: 
- Database
- PostgreSQL
- Function
- Stored Procedure
comments: false
description:
author: J.ian
---

<input type="hidden" id="categoryName" value="Database" />
<input type="hidden" id="postedDate" value="2019-02-03" />

> PostgreSQLでメソッド（Function）を作って使用する方法に対して整理して見る      

&nbsp;&nbsp;
  「Stored Procedure」という名称でも呼ばれる。特定なDBMSで使われるプログラミング言語を利用して作成したり、C言語ような外部プログラミング言語を利用して作成したりする      

> ### PostgreSQLのメソッド（Function, Stored Procedure）を作る方法 

___

#### 1. メソッド（Function）の生成       

&nbsp;&nbsp; **`CREATE FUCNTION`** メソッド名 **`(`** 変数名 **` dataType)`**       
&nbsp;&nbsp; **`RETURNS dataType AS $$`**        
&nbsp;&nbsp;&nbsp;&nbsp; **`DECLARE`**        
&nbsp;&nbsp;&nbsp;&nbsp; **`BEGIN`**         
&nbsp;&nbsp;&nbsp;&nbsp; **`END; $$`**        
&nbsp;&nbsp; **`LANGUAGE plpgsql;`**         

```postgresql

    CREATE FUNCTION add_calc(num1 integer, num2 integer)
    RETURNS integer AS $$               -- 1) メソッドの return type 設定

        DECLARE                         -- 2) メソッドの変数宣言部分
            result_sum integer;         -- resultSum integer := num1 + num2; も可能

        BEGIN                           -- 3) メソッド開始
            result_sum := num1 + num2;  -- 代入演算子 :=

            RETURN result_sum;          -- 4) 結果値返還
        END; $$                         -- 5) メソッド終了
    LANGUAGE plpgsql;                   -- 6) 使用プログラミング言語
```
&nbsp;
 1)のメソッドの returnType 宣言部分は returnsだ, 4)の returnと区分して使用する       
<br /><br />


####  2. 生成したメソッド（Function）でビルトインメソッド使用        

&nbsp;&nbsp; - **`EXTRACT(year from timestamptz '2019-02-04');`** : 2019.000000 (double precision タイプで返還)      
&nbsp;&nbsp; - **`CAST(2019.000000 AS integer);`** : 2019 (double precision -> integer) ;      

```postgresql

    CREATE FUNCTION calc_year(input_date timestamptz)
    RETURNS integer AS $$

        DECLARE
            result_year integer;

        BEGIN
            result_year := cast(extract(year from input_date) as integer);
                            -- extract(year from input_date)::integer;

            RETURN result_year;
        
        END; $$ LANGUAGE plpgsql;
```
&nbsp;
extract()メソッド内で変数を使用する場合、data typeを書かず変数名のみ書く      
<br /><br />


#### 3. メソッド（Function）で条件文の使用 - 1 (IF文)      

&nbsp;&nbsp; **`IF`** 条件 **`THEN`**        
&nbsp;&nbsp;&nbsp;&nbsp; 条件文の内容 **`;`**         
&nbsp;&nbsp; **`ELSEIF`** 条件 **`THEN`**        
&nbsp;&nbsp;&nbsp;&nbsp; 条件文の内容 **`;`**        
&nbsp;&nbsp; **`ELSE`**      
&nbsp;&nbsp;&nbsp;&nbsp; 条件文の内容 **`;`**        
&nbsp;&nbsp; **`END IF;`**      

```postgresql

    CREATE FUNCTION OR REPLACE print_grade(score integer)
        RETURNS char(1) AS $$

        DECLARE
            result_grade char(1);
        
        BEGIN

            IF (score >= 90) THEN
                result_grade := 'A';
            
            ELSEIF (score >= 80) THEN
                result_grad := 'B';
            
            ELSEIF (score >= 70) THEN
                result_grade := 'C';
            
            ELSE
                result_grade := 'D';
            
            END IF;

            RETURN result_grade;
        
        END; $$ LANGUAGE plpgsql;
```
&nbsp;
場合により **`ELSEIF`** と **`ELSE`** を使用しない場合もある       
&nbsp;
not null 条件は **`IF`** 変数名 **`IS NOT NULL THEN`** を使用する       
<br /><br />


#### 4. メソッド（Function）で条件文の使用 - 2 (CASE文)         
&nbsp;&nbsp; **`CASE`**         
&nbsp;&nbsp; **`WHEN`** 条件 **`THEN`**         
&nbsp;&nbsp;&nbsp;&nbsp; 条件文の内容 **`;`**        
&nbsp;&nbsp; **`WHEN`** 条件 **`THEN`**           
&nbsp;&nbsp;&nbsp;&nbsp; 条件文の内容 **`;`**         
&nbsp;&nbsp; **`ELSE`**            
&nbsp;&nbsp;&nbsp;&nbsp; 条件文の内容 **`;`**          
&nbsp;&nbsp; **`END CASE;`**          

```postgresql

    CREATE FUNCTION OR REPLACE print_grade(score integer)
        RETURNS char(1) AS $$

        DECLARE
            result_grade char(1);
        
        BEGIN
            CASE
                WHEN (score >= 90) THEN
                    result_grade := 'A';
            
                WHEN (score >= 80) THEN
                    result_grad := 'B';
            
                WHEN (score >= 70) THEN
                    result_grade := 'C';
            
                ELSE
                    result_grade := 'D';
            
            END CASE;

            RETURN result_grade;
        
        END; $$ LANGUAGE plpgsql;
```
```postgresql

    CREATE FUNCTION OR REPLACE print_grade(score char(1))
        RETURNS varchar AS $$

        DECLARE
            result_grade varchar;
        
        BEGIN
            CASE score
            WHEN 'A' THEN
                result_grade := '90点以上';
            WHEN 'B' THEN
                result_grad := '80点以上';
            WHEN 'C' THEN
                result_grade := '70点以上';
            ELSE
                result_grade := '70点未満';
            END CASE;

            RETURN result_grade;
        
        END; $$ LANGUAGE plpgsql;
```
<br /><br />


#### 5. メソッド（Function）で Select 結果反映        
&nbsp;&nbsp; - **`INTO`** 変数名;        

```postgresql

    CREATE FUNCTION student_name(student_num integer)
        RETURNS varchar AS $$
        
        DECLARE
            result_name varchar;

        BEGIN
            SELECT name into result_name FROM tbl_student
                WHERE s_number = student_num;
                -- name カラムの結果を result_name 変数に代入する

            RETURN result_name;
        
        END; $$ LAGUAGE plpgsql;
```
<br /><br />


___
