---
layout: default
title: "Splitter"
categories:
  - project
  - stompbox
---

# Splitter

## Background

To explain this pedal, I think it's easiest to start with the problem it addresses. Sometimes you want to apply an effect not to the whole signal but only to one part of the frequency spectrum. A good DAW wil be able to split a signal chain and apply effects separately. One common use of this is in bass guitar, where applying effects like gain to the low end can cause it to sound muddy. [Some pedals](https://origineffects.com/product/cali76-compact-bass/) for bass include a built-in high-pass filter to keep the low-end clean.

![Example of very primitive splitter from GarageBand](/images/splitter_garageband.png)

## Usage

### Controls

1. Cutoff (7Hz to 7kHz)
2. Send mode switch (highs, all, lows)
3. Wet/Dry mix
4. Bypass switch

![layout](/images/splitter_cuts.png)

This pedal provides the ability to route certain frequencies through a different effects chain and mix back together again. The wet signal is passed through a pair of send/receive jacks, and mixed back with the dry signal to the output.

### Bypass 

When bypassed (4), IN is connected to OUT (true bypass) and the device is powered off.

### Send mode (2) = up (highs)

This mode can be used to apply effects only to the high frequencies while keeping the low frequencies clean. The low frequencies are kept dry while the high frequencies are sent through the effects send/receive. This is particularly useful for bass guitar to keep the low end clear and crisp when applying a fuzz effect for example.

This mode sends the high frequencies from IN to SEND (wet channel) and mixes (3) the RECV with the low frequencies from IN (dry channel). The cutoff controls the frequency separating low and high.

### Send mode (2) = down (lows)

Like the up mode but the wet and dry are reversed; the low frequencies are sent through the send/receive and the high frequencies are kept dry. This mode can be used to apply effects only to the low frequencies while keeping the high frequencies clean. 

This mode sends the low frequencies from IN to SEND (wet channel) and mixes (3) the RECV with the high frequencies from IN (dry channel). The cutoff controls the frequency separating low and high.

### Send mode (2) = center (all)

In the center position mode, the full spectrum is sent down both paths. This mode can be used to turn a separate parallel effects chain on and off.

IN is sent to SEND. IN and RECV are mixed (3) and sent to OUT. Cutoff (1) has no effect.

### Cutoff

The left knob (1) controls the cutoff point between high and low frequencies, from ~7Hz to ~7KHz. In the center position mode it has no effect.

The right knob (3) allows some blend control between the wet and dry signals. At 12 o'clock, the blend is 50/50. 

## Source

CAD files, SPICE simulations, and decal designs are [on GitHub](https://github.com/rabidaudio/effects/tree/main/splitter). Like most everything I do, this is [open hardware](http://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

## Parts

- 2x 0.1u ceramic capacitors
- 2x 22n ceramic or mylar capacitors
- 3x 1K resistor
- 2x 470K resistor
- 5x 1M resistor
- 1x 3mm LED
- 1x [TLE2426 virtual ground IC](/resources#TLE2426)
- 1x [TL074](/resources#TL07x) quad op-amp
- 1x 14-pin DIP IC holder
- 1x [Alpha 9mm A1M Dual pot](/resources#Alpha%209mm%20pot) (dual gang audio-taper 1M)
- 1x [Alpha 9mm B1M pot](/resources#Alpha%209mm%20pot) (linear taper 1M pot)
- 1x [EG2301](/resources#EG2301) DPDT switch
- 1x 3PDT stompbox foot switch [[Amazon](https://www.amazon.com/gp/product/B012CF181K)]
- 1x 2.1mm Barrel jack [[Amazon](https://www.amazon.com/gp/product/B096XJWZJQ)]
- 4x 1/4" jack 6 pin PCB mount [[Amazon](https://www.amazon.com/gp/product/B097BDHV5Y)]
- 1x Case [[Amazon](https://www.amazon.com/gp/product/B08P8D5TML)]

<!-- TODO: move these common components to resources even though I don't have data sheets -->

## Assembly instructions

1. Solder jumpers JP1, JP2, and JP3 closed
2. Solder resistors, capacitors, TLE2426, and IC holder
3. Solder 9 wires from PCB to SW2 and two wires to power supply pins, both coming out the back side of the board
4. Solder the jacks on the back side of the board
5. Insert TL074 into IC holder. Place SW1, the pots, and the LED in board but don't solder them yet. Align the parts with the case. Put the LED through the whole and hold it in place with a bit of electrical tape. Attach the pots and jacks to the case. When everything is aligned properly and flush, solder the LED, pots, and SW1
6. Attach DC jack to case and solder power wires

No calibration required.

![pcb](/images/splitter_pcb.png)

## Design

![schematic](/images/splitter_schematic.png)

### Power supply

[TLE2426](/resources#TLE2426) provides a signal ground between 0 and 9V, providing a dual-ended 4.5V power supply for the op-amp from a 9V battery or DC adapter typical for effects pedals.

### Input stage

U1B is an input buffer. Since the signal goes directly into the op-amp, this input impedance is quite high (theoretically infinite, in practice upwards of 10MOhm). The input signal also goes into U1D through a voltage divider R4/R5, so the true input impedance on the input pin is 2MOhm. This makes this pedal suitable as a buffer.

### Filter

C1/C2/R1/R2/RV1/U1A act as a variable [2nd-order active high pass filter](https://en.wikipedia.org/wiki/Sallen%E2%80%93Key_topology) with a Q of 0.5 and a cutoff from 7.2Hz to 7.2kHz. U1D subtracts the high pass signal from the input to get a low pass signal.

To vary both R components of a 2nd order filter, it simply uses a dual audio taper pot. Rather than a true [LR active crossover filter](https://en.wikipedia.org/wiki/Linkwitz%E2%80%93Riley_filter), this circuit simply subtracts the original signal from the filtered signal to get the opposite frequencies. This creates a comb filter with an uneven phase shift, which means this pedal will have moderate a tonal effect. Both of these limitations are for cost savings and simplicity. A more robust circuit would use two LR VCFs but this would drastically increase cost and complexity.

![comb effect](/images/splitter_comb_bode.png)

### Jumpers

From there the signals are routed using the switches and jacks. A complex set of jumpers and test points allow reconfiguring the behavior of the circuit. An additional send + receive pair of jacks for the "dry" signal can be added using JP2/J6/J8, while the behavior of the stereo channel can be changed with JP1/J7 and JP3/J9, for example wiring them to a second PCB for stereo support.

### Mixer

Finally U1C/RV2 mixes the wet and dry signals and buffers them to the output. Cost-cutting measures were also used on the mixer design. At this point we've used 3 of the op-amps in a quad package. Rather than adding more op-amps to create VCAs, this design simply uses an [inverting summing amplifier](https://en.wikipedia.org/wiki/Operational_amplifier_applications#Summing_amplifier) with a pot to vary the gain of each signal. R7 and R8 are necessary to set a lower-bound on the input impedance. In the center position, each signal sees a gain of ~1 (`1MOhm/(470KOhm + 500KOhm)`). At the extremes, the lesser signal has a gain of `1MOhm/(470KOhm + 1MOhm) = ~0.68` while the larger signal gets a gain of `1MOhm/470KOhm = ~2.13`. This means it's not linear and will boost one side or the other in extreme settings. It also limits the effective ratio of wet/dry to about 25%-75%, while a more robust circuit would provide a 0%-100% control without any variation in gain.

<!-- panel -->

## Prototype

Below is a picture of the prototype version I assembled. I only had a white LED on hand, and it ended up being really bright, hence the electrical tape. I also learned the hard way some lessons about fitting components in the case; I had to sand down the jacks to fit, hence why some of them are missing hardware. But it does work. Here's a sound sample demonstrating applying gain (from the amazing Behringer Super Fuzz) to only the high frequencies.

<audio controls>
  <source src="/raw/splitter.mp3" type="audio/mpeg">
</audio>

![prototype](/images/splitter_proto.jpg)
