---
title:      Light Dimmer 2
subtitle:   Adding microprocessor control
date:       2015-1-19 23:51:18 -0500
layout:     post
published:  false
category:   hardware
tags:
- arduino
- bluetooth
- electronics
- analog
- 555 timer
- jfet
mathjax:    false
---

So [last week I got the dimmer working]({{ site.baseurl }}{% post_url 2015-01-10-ac-light-dimmer-circuit %}) with a potentiometer
controlling the delay of a 555 timer (which in turn controled the brightness). I thought replacing this potentiometer with a
microprocessor would be trivial, but it ended up requiring a little bit of work. Here's what happened.

The `analogWrite()` function of the Arduino outputs {% wkipe Pulse Width Modulation | PWM %}. This can be converted to an analog signal
with a simple {% wkipe RC circut | RC low-pass filter %}. The larger the time constant `R*C` of this filter, the less ripple there will
be in the output signal, but also the longer it will take the signal to change to a new value (as the capacitor will charge more slowly).
The PWM frequency of of the `ATMega328P` is 500Hz, so 

Unfortunately, you can't connrct this voltage to the capacitor directly; the timer simply won't work for two reasons. The first is
because the output impedance of the microprocessor is low enough that it charges the capacitor almost instantaneously. The other problem
is that the capacitor voltage can only get up to this signal level. That means if the PWM signal is less than the `THRESH` level of the
timer (`2/3 Vcc`), the timer won't trigger. 

One thing people do to control the timer with a voltage is adjust the control voltage rather than the time constant of the RC network.
By pulling the control voltage lower, the RC network will reach that level sooner and trigger faster (and naturally rasing it has the
opposite effect). However,

What I really need is something where looking up from the capacitor it appears to be a 5V source with an output impedance between 0 and
10K ohms. This output impedance needs to be voltage controllable. One option is a digital potentiometer. This may be the best way to go
moving forward, but for the weekend, I needed some analog way of acomplishing this.

FET theory

tuning


programing an attiny

source code

video?