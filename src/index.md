---
layout: default
---

rabid.audio

<ul>
  {% for post in collections.posts.resources %}
    <li>
      <a href="{{ post.relative_url }}">{{ post.data.title }}</a>
    </li>
  {% endfor %}
</ul>

<!-- Loop pedal output -->
<!-- LM13700 writeup -->
<!-- splitter pedal -->
<!-- chorus pedal -->
<!-- bass pedal wiring? -->
<!-- big muff tone hack? -->
