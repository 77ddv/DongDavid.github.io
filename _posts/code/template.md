---
layout: post
title: tp框架分页样式修改
description: tp框架分页样式动态设置失败的解决方法
category: coding
---

## tp框架分页类修改尾页样式失败

使用tp框架分页类的时候，修改first为首页，last为尾页的时候尾页仍然显示数字  
原因是下面这段代码
	
	public $lastSuffix = true; // 最后一页是否显示总页数
在源码think/page.class.php文件中将此代码改为false就可以了  
	
	public $lastSuffix = false; // 最后一页是否显示总页数
其实直接改源码比在代码中设置方便多了，因为默认设置太难看了

*css样式可以直接在css文件里写 分别为	
	
	first end num current rows 
	
5个类对应的是首页，尾页，其他页，当前页，总页数  





