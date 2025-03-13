---
layout: post
title: Gameboy VST plugin
categories:
    - music tech
    - software
---

{% img small center %}gameboy-synth-screenshot.png{% endimg %}

I've been working on an open-source DAW plugin written with [JUCE](https://juce.com/) that exposes the sounds of the Nintendo Gameboy (and Color) as a software instrument for making chiptune sounds. It's a faithful recreation of both the sound and the limitations of the console, because it wraps Shay Green'S [Gb_Snd_Emu](http://www.slack.net/~ant/libs/audio.html#Gb_Snd_Emu), the audio implementation used by many emulators including [Visual Boy Advance - M](https://github.com/visualboyadvance-m/visualboyadvance-m).

[Source code](https://github.com/rabidaudio/gameboy-synth)

[Download](https://github.com/rabidaudio/gameboy-synth/releases/tag/v0.0.1-alpha1) (unsigned debug build, Mac-only)
