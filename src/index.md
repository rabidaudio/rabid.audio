---
layout: default
title: ''
---

Hi, I'm Julien. I'm a hobbyist music technologist. I document some of my active and past projects here. I also [host a lot of datasheets and other resources](http://localhost:4000/resources) that might be useful to other hobbyists. You can [find me on other parts of the internet here](/links).

## Active Projects

- [Synthesizer](/projects/synth)
- Effects pedals
  - [Splitter](/projects/splitter-pedal)
  - [Chorus (WIP)](/projects/chorus-pedal)

There are some other projects that have short [blog posts](/posts).

You can also see a lot more past, mostly software projects, on my [Github profile](https://github.com/rabidaudio).

## Posts

{% for post in collections.posts.resources %}
  <p><code>{{ post.date | date: "%Y-%m-%d" }}</code> <a href="{{ post.relative_url }}">{{ post.data.title }}</a></p>
{% endfor %}