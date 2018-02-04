---
title: php扩展
tag: php extension 扩展
description: php扩展
category: code
---
## php扩展  

查看已安装php扩展  
```
php -m 

```

代码校验方式  
```
<?php 
/**
 * 校验扩展是否存在
 * Don't look at me!
 * @Author   DongDavid(ddv576029053@outlook.com)
 * @DateTime 2017-08-05T00:11:32+0800
 * @param    string    $extension_name 扩展名称
 * @return   boolean                   是否存在
 */
function check($extension_name = 'extension'){
	if (extension_loaded($extension_name)) {
		echo "存在扩展".$extension_name;
		return true;
	}else{
		echo "不存在扩展".$extension_name;
		return false;
	}
}
// 校验mysqli扩展是否开启
check('mysqli');
// 查看phpinfo
phpinfo();
```