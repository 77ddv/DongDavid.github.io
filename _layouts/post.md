---
layout: default
---
<div class="post">
	<div class="post-header">
		<p class="post-header-tag">
			{{page.tags}}
		</p>
		<h1 class="post-header-title">
			{{page.title}}
		</h1>
		
		<p class="post-header-date">
		        {{page.date | date:"%Y-%m-%d"}}
		</p>
	</div>
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
</div>