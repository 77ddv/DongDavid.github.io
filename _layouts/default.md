<!DOCTYPE html>
<html lang="zh">
<head>
	<title>{{site.title}} | {{page.title}}</title>
	<meta charset="utf-8">
	<!-- <meta content=”initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width” name=”viewport” /> -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
	<meta content=”telephone=no” name=”format-detection” />
	<meta name="description" content="{{ site.description }}">
	<meta name="author" content="David Dong" />
  	<!-- <meta name="renderer" content="webkit"> -->
	<link rel="stylesheet" href="/static/css/main.css">
</head>
<body>

<div class="ddv-container" id="container">
{% include header.html %}


{{ content }}


</div>
{% include footer.html %}




<script src="/static/js/main.js"></script>

</body>
</html>