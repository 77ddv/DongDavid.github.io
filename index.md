---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home
---


<h1>
	<!-- what's more？ -->
	最新的几篇
</h1>

{% for post in site.posts limit:5 %}
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
更多的内容请到[归档](/archive)里面找


