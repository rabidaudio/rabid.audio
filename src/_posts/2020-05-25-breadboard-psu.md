---
layout: post
title: Eurorack breadboard power adapter
---

When I prototype on a breadboard, I have a consistent way of using the power rails on the top and bottom so that I don't accidentally plug anything in backwards. From top to bottom, its +12v, GND, then GND and -12v.

To run the breadboard off my Eurorack power supply, I rigged up a little adapter. It sits in the power supply rails. It's got a pair of large filter capacitors and a pair of 1 ohm resistors acting as cheap fuses. The other signal lines (5V, Gate, and CV) are accessible through female pin headers. And on the bottom side is a large metal lug connected to ground, which is great for clipping scope/generator/multimeter leads to.

{% img full %}breadboard_power.jpg{% endimg %}
