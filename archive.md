---
layout: default
title: 归档
---




<div class="ddv-archive">
	<div class="ddv-archive-item">
		<h2>code</h2>
		{% for post in site.categories.code %}
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
	<div class="ddv-archive-item">
		<h2>life</h2>
		{% for post in site.categories.life %}

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
</div>


