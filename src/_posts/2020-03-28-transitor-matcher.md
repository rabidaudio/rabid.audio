---
layout: post
title: Transistor matcher
categories:
    - electronics
---

Matched pairs of BJTs are a common requirement in analog audio circuits for current mirrors and exponential converters. Fancy machines can measure the behavior of individual transistors so their input and output characteristics can be plotted and compared. But [this technique from Ian Fritz](/resources/reference/transistor-matching.pdf) suggests a much more hobbyist-friendly approach. Effectively it biases two transistors with the same expected currents and measures the actual difference between the two.

This circuit automates that approach using a microprocessor. The difference in emitter voltages is measured using an instrumentation amplifier to amplify the microvolt differences for measurement by the microprocessor. The microprocessor can then display on a 14-segment display the difference as well as a qualitative assessment (e.g. "good", "ok", "bad"). A trimmer allows for the measurement to be taken without swapping the transistors, as the resistances can be tuned to near exact matches. A switch allows flipping the current direction for testing both NPN and PNP transistors.

{% img full %}transistor-matcher-schematic.png{% endimg %}

Kicad project is [on Github](https://github.com/rabidaudio/synthesizer/tree/master/transistor_matcher). I proved the behavior on a breadboard, but stopped before actually writing the firmware. I opted instead to use discrete matched pair ICs such as the [DMMT5401](/resources#DMMT5401) and [DMMT5551](/resources#DMMT5551) in place of hand-matching transistors. They aren't very expensive, are guaranteed to be well-matched, and are already thermally-coupled (often a requirement for matched pair use-cases).
