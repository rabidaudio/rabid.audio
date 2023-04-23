---
layout: default
title: "Bass Chorus Pedal"
categories:
  - project
  - stompbox
---

I'm working on a custom analog chorus pedal, focused for bass. It's "analog", based on MN3102/MN3207 [Bucket-brigade (BBD)](https://en.wikipedia.org/wiki/Bucket-brigade_device) chips. Analog is in quotes because BBD is really a form of digital sampling, but done in a very analog way.

## Source

Source files including code and CAD are available on [GitHub](https://github.com/rabidaudio/effects/tree/main/chorus/chorus). Like most everything I do, this is [open hardware](http://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

## Status

**Work in progress.** Parameters have been selected, needs confirmation on breadboard, some final schematic tweaking, and then PCB design.

## Design

### [View online](https://kicanvas.org/?github=https%3A%2F%2Fgithub.com%2Frabidaudio%2Feffects%2Ftree%2Fmain%2Fchorus%2Fchorus)

### BBD

The Panasonic MN3xxx chips are popular choices for BBD. The [MN3207](/resources/#MN3207) is the actual BBD, effectively a large chain of switched capacitors. The [MN3102](/resources/#MN3102) eases generating the clock signals and voltages the MN3207 needs (but you could certainly design without it).

Sadly most BBD chips are no longer manufactured. The chips I got are [likely counterfeit](https://www.youtube.com/watch?v=7epnv43jGV8); more then half of them didn't work at all. However I was able to find at least one good pair in a set of 10. Once the design is finalized, I'll see if I can find any new old-stock or something like that.

### Filtering

[This blog post](https://www.electrosmash.com/mn3007-bucket-brigade-devices) has a pretty good summary of designing with BBDs. Importantly, a decent amount of filtering is required both before and after the delay. This post also recommends using compression and expansion to increase the dynamic range, but I decided against that; it would have made the circuit significantly more complex and expensive. Instead I tuned the parameters to the way I actually play. It means the tone will vary with dynamics, but to me this is just more character for the effect.

With bass guitar, applying effects to the low end can make the tone sound muddy and not very bass-like. Therefore, I apply the chorus effect to only the high band, using a [tone filter circuit that I've used elsewhere](splitter-pedal).

For a flange effect, some amount of the wet signal is fed back into the input, which gives it a wider, reverb-y sound. This design includes allowing up to 50% of the wet signal to feed back.

The delay amount is controlled by a clock signal, that switches the capacitors. The formula for the delay time is `1024 stages / 2 / clock frequency (Hz)`, so 200Khz becomes a 2.56ms delay and 10KHz a 51.2ms delay. The [datasheet](/resources/#MN3207) suggests that these are the bounds of what the chip can support, but it does seem to work beyond these bounds, particularly on the higher frequency (lower delay end). I've designed the clock output to be ~250KHz to ~20KHz, or a delay range from 2ms to 25.6ms.

The clock is a square wave VCO made from an [LM13700](/resources#LM13700). A triangle LFO signal oscillates the clock frequency. This LFO is generated from a microprocessor, which keeps the required number of parts low and allows for flexibility in LFO generation (e.g. switching from triangle to sine, non-linear control parameters, etc). In theory the whole clock signal could be generated this way and the LM13700 VCO could be removed; I may still do this in a future revision.

Stages:

1. Input buffer - sets the input impedance, and mixes in feedback signal
2. Tone filter - separates the highs from lows. passes highs along effects chain
3. Anti-aliasing filter - gets the input signal within the requirements of the [Nyquist limit](https://en.wikipedia.org/wiki/Nyquist%E2%80%93Shannon_sampling_theorem)
4. BBD - delays the input signal by a few milliseconds
5. Reconstruction filter - filter out any aliasing and clock noise
6. Output buffer - the wet highs are mixed back with the dry lows. these are then mixed with the pure dry signal to limit the intensity of the effect

### Simulation

In order to properly select the control parameter ranges and experiment with filter requirements, I simulated the circuit in Max MSP and played bass through that simulation. It simulates aliasing using `downsamp~`. It also uses a non-linear control function for LFO rate, which was derived from picking a range of rates that sounded good and roughly evenly-spaced from a "goodness" perspective, and [fitting a function to that ideal curve](https://docs.google.com/spreadsheets/d/1kvplbcg9_sloKRhXaWvJHcXoQZFK4X6Lk1JHIbradk8/edit?usp=sharing#gid=524353718). The result was `1.25 ^ (19.2 * rate - 15.4)` (where rate is 0-1 and the result is in Hz).

The parameters I settled on:

- HP cutoff: 50Hz to 5KHz, center: 500Hz
- LFO rate: 0.032Hz to 2.296Hz
- Delay: 2ms to 25ms
- Wet/Dry mix: 0%/100% to 50%/50%
- Feedback amount: 0% to 50%
- AA filter: 3rd order Butterworth LP with 7KHz cutoff
- Reconstruction filter: 5th order Butterworth LP with 4.4KHz cutoff

{% img full %}chorus-max.png{% endimg %}