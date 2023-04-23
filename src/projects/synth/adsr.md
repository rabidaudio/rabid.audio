---
layout: default
title: "Synthesizer - Envelope module"
categories:
  - project
  - synthesizer
---

This is an ADSR-style envelope module. It's dual channel with the knobs controlling both channels.

To my knowledge this circuit is a unique approach to the problem. It uses an LM13700 as a slew-rate-limited buffer and a cheap analog latch.

## Source

Source files including code and CAD are available on [GitHub](https://github.com/rabidaudio/synthesizer/tree/clock/clock). Like most everything I do, this is [open hardware](http://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

## Status

This module is still a work-in-progress. The design has been confirmed on a breadboard, but the PCB still needs to be designed.

## Design

[Source code](https://github.com/rabidaudio/synthesizer/tree/master/adsr)

{% img full %}adsr-schematic.png{% endimg %}

### [View Online](https://kicanvas.org/?github=https%3A%2F%2Fgithub.com%2Frabidaudio%2Fsynthesizer%2Ftree%2Fmaster%2Fadsr)
