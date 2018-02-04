---
title: mysql性能分析
category: code
description: mysql性能分析
tag: mysql 性能分析
---
mysql性能分析  
===============

## explain  

在查询语句前加上了explain关键字，会显示出相关的查询信息

EXPLAIN 的每个输出行提供一个表的相关信息,并且每个行包括下面的列: 

### id

SELECT识别符。这是SELECT查询序列号。这个不重要,查询序号即为sql语句执行的顺序，看下面这条sql  

### select_type

select类型，它有以下几种值

2.1 simple 它表示简单的select,没有union和子查询

2.2 primary 最外面的select,在有子查询的语句中，最外面的select查询就是primary,上图中就是这样

2.3 union union语句的第二个或者说是后面那一个.现执行一条语句，explain 
select  *  from uchome_space limit 10 union select * from uchome_space limit 10,10

2.4 dependent union    UNION中的第二个或后面的SELECT语句，取决于外面的查询

2.5 union result        UNION的结果,如上面所示

### table  

输出的行所用的表，这个参数显而易见，容易理解

### type

连接类型。有多个参数，先从最佳类型到最差类型介绍 重要且困难
4.1 system

表仅有一行，这是const类型的特列，平时不会出现，这个也可以忽略不计

4.2 const

表最多有一个匹配行，const用于比较primary key 或者unique索引。因为只匹配一行数据，所以很快

记住一定是用到primary key 或者unique，并且只检索出两条数据的 情况下才会是const,看下面这条语
4.3 eq_ref
对于eq_ref的解释，mysql手册是这样说的:"对于每个来自于前面的表的行组合，从该表中读取一行。这可能是最好的联接类型，除了const类型。它用在一个索引的所有部分被联接使用并且索引是UNIQUE或PRIMARY KEY"。
4.4 ref 对于每个来自于前面的表的行组合，所有有匹配索引值的行将从这张表中读取。如果联接只使用键的最左边的前缀，或如果键不是UNIQUE或PRIMARY KEY（换句话说，如果联接不能基于关键字选择单个行的话），则使用ref。如果使用的键仅仅匹配少量行，该联接类型是不错的。

4.5 ref_or_null 该联接类型如同ref，但是添加了MySQL可以专门搜索包含NULL值的行。在解决子查询中经常使用该联接类型的优化。

上面这五种情况都是很理想的索引使用情况
4.6 index_merge 该联接类型表示使用了索引合并优化方法。在这种情况下，key列包含了使用的索引的清单，key_len包含了使用的索引的最长的关键元素。

4.7 unique_subquery 

4.8 index_subquery

4.9 range 给定范围内的检索，使用一个索引来检查行。看下面两条语句







### possible_keys 提示使用哪个索引会在该表中找到行，不太重要

### keys MYSQL使用的索引，简单且重要
### key_len MYSQL使用的索引长度

### ref   ref列显示使用哪个列或常数与key一起从表中选择行。

### rows 显示MYSQL执行查询的行数，简单且重要，数值越大越不好，说明没有用好索引

### Extra  该列包含MySQL解决查询的详细信息。













## 创建环境  

```
CREATE DATABASE IF NOT EXISTS exp_test DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

# 订单表 
create table if not exists good_order1 (
  	`id`  bigint UNSIGNED NOT NULL AUTO_INCREMENT ,
  	`create_time` int UNSIGNED NOT NULL ,
  	`update_time` int UNSIGNED NOT NULL ,
  	#`create_time`  datetime NULL DEFAULT CURRENT_TIMESTAMP ,
	#`update_time`  datetime NULL ON UPDATE CURRENT_TIMESTAMP ,
  	`user_id` bigint UNSIGNED NOT NULL ,
  	`good_id` bigint UNSIGNED NOT NULL ,
	`order_id` char(32) NOT NULL COMMENT '订单唯一编号',
	`price`  decimal(10,2) UNSIGNED NOT NULL ,
	`order_status`  tinyint UNSIGNED NOT NULL COMMENT '订单状态 1 未付款 2 已付款未发货 3 已发货未收货 4已收货 5 已退货 ' ,
	PRIMARY KEY (`id`)
);
#插入测试数据 最ZZ的方法 需要300多秒
drop procedure if exists addTestData;
create procedure addTestData()
BEGIN
declare i int;
set i = 0;
while i<100000 do 

insert into good_order (created_at,updated_at,user_id,good_id,order_id,price,order_status) 
values (1506566133,1506566133,FLOOR(1+rand()*100000),FLOOR(1 + 100000*RAND()),md5(rand()*100000),rand()*1000,FLOOR(rand()*3+1));

set i = i+1;
end while ;
END;

call addTestData();

# 添加测试数据 用事务添加 时间: 8.649s
drop procedure if exists addTestDataByTransaction;
create procedure addTestDataByTransaction()
BEGIN
declare i int;
set i = 0;
start transaction;
while i<100000 do 
insert into good_order (created_at,updated_at,user_id,good_id,order_id,price,order_status) 
values (1506566133,1506566133,FLOOR(1+rand()*100000),FLOOR(1 + 100000*RAND()),md5(rand()*100000),rand()*1000,FLOOR(rand()*3+1));
set i = i+1;
if mod(i,10000) = 0 then 
#每隔10000条数据提交一次事务
commit ;
start transaction;
end if;
end while ;
END;

call addTestDataByTransaction();

# 还有一种拼接的 insert into (XX) values(XX),(XX),(XX),...

```


性能测试  

无索引  

explain select user_id,order_id,good_id from good_order where user_id >12000 and user_id >13000;


id	select_type	table	partitions	type	possible_keys	key			key_len	ref	rows	filtered	Extra
1	SIMPLE		good_order			ALL										208884	11.11		Using where

1	SIMPLE		good_order			ALL										208884	3.7			Using where

增加user_id 普通索引  

id	select_type	table	partitions	type	possible_keys	key			key_len	ref	rows	filtered	Extra
1	SIMPLE		good_order			range	idx_user_id		idx_user_id	8			1596517	100			Using index condition; Using MRR

[SQL]explain select user_id,order_id,good_id from good_order where user_id >12000 and user_id >13000 limit 1000;
受影响的行: 0
时间: 0.002s

[SQL]

select user_id,order_id,good_id from good_order where user_id >12000 and user_id >13000 limit 1000;
受影响的行: 0
时间: 0.068s


无索引  
id	select_type	table	partitions	type	possible_keys	key	key_len	ref	rows	filtered	Extra
1	SIMPLE	good_order		ALL					2881645	11.11	Using where


联合索引
user_id  good_id
[SQL]explain select user_id,order_id,good_id from good_order where user_id >12000 and user_id >12222 limit 2000;
受影响的行: 0
时间: 0.001s

[SQL]
select user_id,order_id,good_id from good_order where user_id >12000 and user_id >12222 limit 2000;
受影响的行: 0
时间: 0.334s

1	SIMPLE	good_order		range	uni_u_g	uni_u_g	8		1440822	100	Using index condition; Using MRR



[SQL]explain select user_id,order_id,good_id from good_order where good_id >12000 and good_id >12222 limit 2000;
受影响的行: 0
时间: 0.000s

[SQL]
select user_id,order_id,good_id from good_order where good_id >12000 and good_id >12222 limit 2000;
受影响的行: 0
时间: 0.018s


1	SIMPLE	good_order		ALL					2881645	11.11	Using where


[SQL]explain select user_id,order_id,good_id from good_order where user_id >12000 and good_id >12222 limit 2000;
受影响的行: 0
时间: 0.003s

[SQL]
select user_id,order_id,good_id from good_order where user_id >12000 and good_id >12222 limit 2000;
受影响的行: 0
时间: 0.043s

1	SIMPLE	good_order		range	uni_u_g	uni_u_g	8		1440822	33.33	Using index condition; Using MRR  


