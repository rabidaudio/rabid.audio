---
layout: default
title: ""
---

Hi, I'm Julien Dorothy. I'm a [musician](/music) and hobbyist music technologist. I document some of my active and past projects here. I also [host a lot of datasheets and other resources](/resources) that might be useful to other hobbyists. You can [find me on other parts of the internet here](/links).

You can also see a lot more past, mostly software projects, on my [Github profile](https://github.com/rabidaudio). And if you need it, my [professional resume](/resume).

## Projects

{% for project in site.data.projects %}
  - [{{ project[0] }}]({%link {{ project[1].first[1].path }} %})
{% endfor %}

## Posts

{% for post in collections.posts.resources %}

  <p><code>{{ post.date | date: "%Y-%m-%d" }}</code> <a href="{{ post.relative_url }}">{{ post.data.title }}</a></p>
{% endfor %}
