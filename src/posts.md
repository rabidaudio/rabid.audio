---
layout: default
---

{% for post in collections.posts.resources %}
  <p><code>{{ post.date | date: "%Y-%m-%d" }}</code> <a href="{{ post.relative_url }}">{{ post.data.title }}</a></p>
{% endfor %}

<!-- post ideas -->

<!-- LM13700 writeup -->
<!-- bass pedal wiring? -->
<!-- big muff tone hack? -->
<!-- dual ended power supply -->
<!-- magnet wire prototyping -->
<!-- gear: psu, iron, multimeter, scope -->
<!-- bare mcu programming -->
<!-- plastic vintage tone -->
<!-- debugging techniques -->
<!-- time domain and frequency domain -->
<!-- list of instruments -->
<!-- jagmaster setup -->
<!-- favorite vinyl records -->
