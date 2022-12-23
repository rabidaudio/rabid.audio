---
layout: default
title: "Custom Eurorack Synth modules"
---

This is a collection of custom synthesizer modules designed around the [Eurorack](https://en.wikipedia.org/wiki/Eurorack) standard.

The goal is to design these from scratch; I can use textbook and datasheet example circuits, and I can look at other circuits for ideas and inspiration, but I'm not cloning an existing circuit but instead coming up with my own designs.

Some of these modules are [emulated in Max MSP](https://github.com/rabidaudio/synthesizer/blob/master/synth.maxpat) to preview how the circuits will sound.

<img style="width: 100%; max-width: 500px" src="/images/vco-emulation.png">

## Modules

This is a work in progress; different modules are at different stages of development.

| Module                                                                          | Status         | Description  |
|---------------------------------------------------------------------------------|----------------|--------------|
| [CLK](https://github.com/rabidaudio/synthesizer/tree/clock/clock)               | PCB Design     | [Docs](clk)  |
| [VCA](https://github.com/rabidaudio/synthesizer/tree/master/amp)                | PCB Design     |              |
| [ADSR](https://github.com/rabidaudio/synthesizer/tree/master/adsr)              | Schematic      |              |
| [VCO](https://github.com/rabidaudio/synthesizer/tree/master/vco)                | Schematic      |              |
| [VCF](https://github.com/rabidaudio/synthesizer/tree/master/_old/class/project) | Schematic      |              |
| [UTIL](https://github.com/rabidaudio/synthesizer/tree/master/utils)             | Needs revision | [Docs](util) |

## Utilities

In the process of building these modules, I've also built some tools to assist.

- [Headphone breakout board](/2020/03/15/headphone-breakout)
- [Breadboard supply adapter](/2020/05/25/breadboard-psu)
- [Transistor matcher](/2020/03/28/transistor-matcher)

## Source

This project is hosted on [Github](https://github.com/rabidaudio/synthesizer). The repository goes back quite a long way, evolving out of coursework from [GT ECE 4893 Analog Circuits for Music Synthesis](https://lanterman.ece.gatech.edu/ems10/) with Dr. Lanterman.

In the spirit of the open-design movement, all source code is licensed under the permissive MIT license, and circuit designs are licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike](http://creativecommons.org/licenses/by-nc-sa/4.0/) license.

![CC-BY-NC-SA](https://camo.githubusercontent.com/f05d4039b67688cfdf339d2a445ad686a60551f9891734c418f7096184de5fac/68747470733a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f6c2f62792d6e632d73612f342e302f38387833312e706e67)

## Eurorack

Eurorack is a loose standard for small modular synthesizers. It uses:

- 10 or 16-pin ribbon power: +/-12V, 5V digital. [Pinout](http://www.davidhaillant.com/wp/wp-content/uploads/bus_eurorack1.pdf)
  - ![Pinout-Diagram](/images/eurorack_pinout.png)
- 3.5" mono patch cables
- 3U tall rack mount, split into 5.08mm horizontal units (HP)
- Audio signals are typically a maximum of 10V peak-to-peak (i.e. between -5V and +5V)
- Control voltages can either be unipolar or bipolar. Bipolar control voltages are typically 5V peak-to-peak (i.e. from -2.5V to +2.5V), unipolar voltages between 0V and 8V. The V/Octave scale is used for pitch information
- Trigger, Gate or Clock signals are digital 0V-5V pulses typically used for timing and event signaling

In addition, I'm targeting:

- minimum 100K input impedance
- maximum 1K output impedance
- connecting rail voltages to signal inputs should not fry any components (although it doesn't have to perform correctly)
- "semi-semi-modular"
  - modules are fully modular and independent, but have additional connections on the back
    for connecting other modules to default inputs/outputs if a jack is unplugged. This provides the benefits of both semi- and fully-modular
- Try to keep jack placement consistent, i.e. jacks on top with knobs on bottom

## Common Design Components

- [TL07x](/resources#TL07x)
  - Basic audio-quality op-amp
  - single, dual, or quad
  - note: not rail-to-rail, and asymmetrical clipping
  - slew rate minimum 5 V/us, typical 13 V/us
  - could be trivially substituted for any other general-purpose op-amp
- [LM13700](/resources#LM13700)
  - dual operational transconductance amplifier
    - effectively an op-amp with control of the output current
    - could also think of it as a current-controlled resistor
    - makes voltage control easy
    <!-- - [see detailed behavior for equations](reference/lm13700) -->
  - sensitive inputs:
    - `I_abc` is limited to 2mA
    - differential input voltage is only linear at +/- 20mV
      - using linearizing diodes, linear region can be extended to +/- 60mV
    - differential input voltage is limited to 5V
  - treat amp bias input as `V- + 1.2V` for the purpose of calculating `I_abc`
  - 50 V/us slew rate
- [DG403](/resources#DG403)
  - dual SPDT analog switch
  - very generous on control ranges and input limits
  - switching time in 100ns range
  - on resistance in the 45 ohm range
  - Unfortunately no DIP package - SOIC is largest size (10mm long)
  - preferred over CD4066
    - CD4066 has max 20V supply differential, which makes it frustrating to use with +/-12V supply
    - when off, CD4066 connects the pins to the minus supply voltage, which makes it impractical in many situations
- Tempco resistors
  - resistance varies with temperature. Useful for canceling out temperature dependance
  - not strictly required - classic synths would take some time to "heat up"
- 2N3904 / 2N3906
  - General-purpose BJTs
- [DMMT5401](/resources#DMMT5401) (NPN) and [DMMT5551](/resources#DMMT5551) (PNP) matched pair transistors
  - similar characteristics to 2N3904, 2N3906
  - useful for current mirrors and [exponential converters](/resources/reference/exponential.pdf)
  - easier than trying to match transistors by hand (but [here's a guide for matching](/resources/reference/transistor-matching.pdf))
  - Unfortunately only come in SOT26 (3mm long)
- 2N2222
  - General-purpose Diodes
- [Alpha 9mm pots](/resources#Alpha%209mm%20pot)
- [Thonkiconn 3.5mm jack](/resources#Thonkiconn%203.5mm%20jack)
