---
title: phpDocument生成文档
tag: phpDocument
description: phpDocument自动生成文档
category: code
---
## 利用phpDocument自动生成文档  

## 下载  
```
	composer require phpdocumentor/phpdocumentor

```
使用时  
```
cd ./vendor/phpdocumentor/phpdocumentor/bin  
phpdoc -d C:/workspace/proj -f C:/workspace/doc

```


或者直接下载phar  
链接  https://phpdoc.org/phpDocumentor.phar  

## 生成

对文件生成文档需要使用-f参数 文件夹使用-d参数 -t参数后面跟生成文档的保存目录  

```
 phpdoc -d path/to/my/project -f path/to/an/additional/file -t path/to/my/output/folder

```  


## 全局使用  
将phar包放到php目录下  
在同目录下新建一个phpdoc.bat脚本  
保存内容  
```
@php "%~dp0phpDocumentor.phar" %*

```  
使用时  
```
phpdoc -d ./pro -t ./doc

```