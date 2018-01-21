---
layout: default
---
<div class="ddv-post-header">
	<h1>
		{{page.title}}
	</h1>
	<p>
	        --{{page.date | date:"%Y-%m-%d"}}
	</p>
</div>
<p>分类:  {{page.categories}}/{{page.tag}}</p>

<hr>
<div class="ddv-post-content">
	{{page.content}}
</div>



<hr>
 你可能感兴趣：
{% for post in site.related_posts limit:5 %}

<ul class="ddv-post-list">
	<li>
		<span class="ddv-post-list-title"> 
			<a href="{{ baseurl }}{{ post.url }}">
				{{ post.title }}
			</a>
		</span> 
			  
		<span class="ddv-post-list-date">
			---- {{ post.date|date:"%Y-%m-%d" }}
		</span>
	</li>
</ul>

{% endfor %} 