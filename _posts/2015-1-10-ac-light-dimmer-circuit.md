---
title:      AC Light Dimmer Circuit     # Titles shouldn't be more than 33 chars for good formatting.
subtitle:               # Roll over into the subtitle if neccessary (optional)
date:       2015-1-10 18:24:58 -500      # 2008-12-14 10:30:00 +0900
layout:     post
published:  true
category:   hardware  # colored categories are: [software, hardware, policy]
tags:
- electronics
- analog
- 555 timer
mathjax:    true       # enable this if you want to use LaTeX
---

One of my new years resolutions is to accomplish something in a side project every week, whether that means
a major step in a big project or the completeion of a smaller project (another is to blog more, so these
work together nicely). Here's this week's.

![NOT lamp](http://www.ikea.com/us/en/images/products/not-floor-uplight-black__0085594_PE213371_S4.JPG){:class="right" source="IKEA"}

When I moved into my old apartment, I bought [the cheapest floor lamp in Ikea](http://www.ikea.com/us/en/catalog/products/10139879/).
Part of the reason it is so cheap is that the wire runs along the outside of the pole, which doesn't look particularly attractive.
So one evening I got a metal saw and cut a new whole near the base and ran the wire through the inside of the pole, increasing it's
attractiveness dramatically. 

One consequence of this was I lost the power switch to the lamp. At the time it was on a wall switch circuit, but now that I've
moved, the only way to turn it on and off is to use the plug. I was considering a few quick electrical ways to fix this, and
at the time I had just started playing with app development, so I decided I'd make a app+bluetooth-controlled switch for it. Then,
If I'm going to that much trouble anyway, why not make an AC dimmer while I'm at it?

It turns out AC dimmers are a little more complicated than I had suspected.
[This Stack Exchange answer](http://electronics.stackexchange.com/a/35686) was the main source of design, but I had to do some
other research and tweaks to get it to work. Let me break down what I've learned.

Electric lights of all kinds (incandescent bulbs, LEDs, etc) typically require some specific voltage to function. In some cases,
lowering the voltage will lower the brightness, but you don't neccessarily have much control of the brightness this way. Instead,
lights are typically dimmed using {% wkipe Pulse-Width Modulation %}. Essentially, this means switching the light on and off really
fast (so fast that you can't see the individual pulses) and changing the ratio of how long it spends on to how long it spends off
(known as the {% wkipe duty cycle %}).

Typically switching is done using transistors. But while BJT and MOSFET switching operation is somewhat streightforward, switching
AC signals is a bit less to. To do so, you use a {% wkipe TRIAC %}.

![SCR circit symbol](http://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Thyristor_circuit_symbol.svg/480px-Thyristor_circuit_symbol.svg.png){:width="100px" class="left" source="Wikimedia"}

To understand the operation of a triac, you first need to understand {% wkipe Silicon-controlled rectifiers %}. SCRs are three pin
transistors which act somewhat like a gate-controlled diode (as their circuit symbol suggests). An SCR is normally nonconductive,
both when reversed biased (like a diode) and even when forward-biased (unlike a diode). However, when a current is applied to the
gate and the device is forward-baised, it begins conducting. Here's were it get's a little strange: after that, the device will
remain conductive no matter what happens to the gate, causing it to act like a latch of sorts. The only way for it to return to a
non-conductive state is for the bias to fall to zero, at which point it returns to the non-conductive state.

![TRIAC circit symbol](http://upload.wikimedia.org/wikipedia/commons/d/d1/Triac.svg){:width="100px" class="left" source="Wikimedia"}

A triac works like two SCRs connected in antiparallel, allowing the gate to control the conductivity in both directions. Each time
the the signal alternates directions, one of the SCRs will be reversed-baised and the device will return to its non-conductive mode.
So to use it as a dimmer, we need to trigger the gate in the middle of each half-cycle. Triggering at the beginning of the half-cycle
means the signal is conducted for most of the time, and the light will be bright, while triggering near the end of the half-cycle means
the light is switched off for all but a very brief period of time, making it appear dim.

![A dimmed AC signal](http://upload.wikimedia.org/wikipedia/commons/e/ec/Dimmer_60_volts.png){:source="Wikimedia"}

![Optocoupler](http://i.stack.imgur.com/WIHIr.png){:source="Stack Exchange" class="left"}
The problem here is you need to know when a new half-cycle starts, which is the purpose of a zero-cross detector. According to the
Stack Exchange post, zero-cross detection is done using an optocoulpler such as the
[TCET1600](http://www.vishay.com/docs/83538/tcet1600.pdf) that I used. Inside this chip are LEDs and phototransistors. When an AC
signal is connected in this configuration, the output is a short pulse at every zero crossing (when the LEDs turn off and the
transistor stops shorting the output to ground). It also has the benefit of acting as an {% wkipe optoisolator %}, protecting the
low-power digital circuitry from the power mains.

The post suggests using a microprocessor to control the delay between this signal and triggering the triac. However, since the delay
needs to be between 0 and $$ \frac{1}{60Hz}\frac{1}{2} \approx $$ 8.3 ms for a full range of dimming. With an arduino, you can
delay integer multiples of 1ms, which doesn't give you very much control over the brightness.

![555 monostable](http://upload.wikimedia.org/wikipedia/commons/1/19/555_Monostable.svg){:source="Wikimedia" class="right"}

Instead, I decided to use a {% wkipe 555 timer %} in monostable mode. The signal time is $$ t=RC\ln(3)\approx 1.1RC $$. With a
10K potentiometer, the desired capacitance is $$ 0.76 \mu F \approx 0.86 \mu F $$. I didn't have one of exactly this value on hand
so I used a $$ 1 \mu F $$ instead, whiched caused the aliasing seen in the video. Since the 555 timer is started by `TRIG` going
low, we need an inverter before it, and because we want the triac to trigger _after_ the 555's pulse, we need to inverter after
as well.

As the Stack Exchange post points out, the circuit isn't actually optoisolated unless the optput is protected as well. For that,
it suggests using the [MOC3051](https://www.fairchildsemi.com/datasheets/MO/MOC3051M.pdf), which uses LEDs to trigger a triac.
Since the MOC3051's triac is a little sensitive to high voltages, we use it to trigger a second higher power triac (in this case,
a [BT136](http://www.nxp.com/documents/data_sheet/BT136_SERIES.pdf)).

![Output stage](http://i.stack.imgur.com/puXQb.png){:source="Stack Exchange"}

With all of this together, you can see the input and output signals on the oscilloscope in the video below. To finish the project,
I need:

- A transformer to step down the voltage into the zero-cross detector
- To replace the resistor with the PWM output of a microprocessor
- A bluetooth module for the microprocessor
- A snazzy case (maybe whip up an Eagle schematic and print a board?)

{% youtube http://youtu.be/MvwS5ucSz_4 %}