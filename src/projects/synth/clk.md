---
layout: default
title: "Synthesizer - Clock module"
categories:
  - project
  - synthesizer
---

This is a clock Eurorack synth module designed to drive sequencers, drum machines, arpeggiators, etc.

It's entirely digital, which makes it an easier module to build since most of the complexity is in software.

## Source

Source files including code and CAD are available on [GitHub](https://github.com/rabidaudio/synthesizer/tree/master/clock). Like most everything I do, this is [open hardware](http://creativecommons.org/licenses/by-nc-sa/4.0/).

![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png)

## Status

In development. Working on a breadboard, most features software features have been implemented. PCB design in progress.

### TODO

- Assemble and verify PCB
- Fix software
- Design panel cuts and decals
- Assemble PCB and verify
- Cut and decal panel

## Features

- 15 to 300 BPM
- Tap-tempo input
- CV input for controlling clock speed
- Swing control, up to triplets up or back
- A separate subdivision output which can trigger at an integer multiple of the clock speed
- Efficient 3HP size

### Future features

- "negative" subdivisions
- remember BPM setting between power cycles
- start/stop/restart

## Usage

- Turn the knob to control the BPM. LEDs display the current BPM, and decimal points blink with the outputs.
- Apply a unipolar voltage from 0-5V to the CV input to adjust the clock speed. 0V is no additional increase in rate over the knob setting. Each 1V is 64 additional BPM, capped at 300 BPM.
- Tap the knob button two or more times to set the BPM through tap-tempo. This effects the base BPM before the CV is applied.
- Hold the subdivision button and turn the knob to control the subdivisions. LEDs display the subdivision setting.
- Hold the swing button and turn the knob to control the amount of swing. LEDs display the swing amount from -127 to 127.
- Press both the subdivision button and swing button at the same time to reset the subdivision counter and pause the clock. LEDs display `000`.
- Hold both the subdivision button and swing button at the same time for 2 seconds to perform a factory reset, returning the BPM, subdivision, and swing settings to the defaults.

## Design

![schematic](/images/clock_schematic.png)

The [ATMega328P](/resources#ATMega328P) is used as the core microprocessor. Originally I planned on using the [ATTiny85](/resources#ATTiny85) with an [HT16K33](resources#HT16K33) LED driver, but there were just enough available pins on the Mega to drive the 7-segment displays directly, and the availability of a 16-bit timer drastically improves the resolution of the clock.

An ISP header allows reprogramming of the firmware using any AVR programmer.

The code uses [PlatformIO](https://platformio.org/) for build tooling. Separate C++ classes encapsulate logic of each of the components, using header-only files to simplify file structure.

This is a relatively simple module, all digital module with most of the logic in code. However much of the complexity comes from targeting a 3HP size. 1HP is only 5.08mm wide, so we're working with effectively 15mm of horizontal space. Some weird schematic wiring and pin assignments is done to simplify PCB routes.

### Timer

`Timer1` is a 16-bit timer which is used as the clock core. This way the main loop is free to focus on user input without worrying about timing or performance; `Timer1` will interrupt when it's time to trigger a clock signal. It counts from 0 up to the value in register `OCR1A`, at which point an interrupt is issued and the timer restarts. We bring the clock pin high when the timer is at 0. We use `OCR1B` as a second interrupt at 313 to bring the clock signal low again, creating a fixed pulse width of 20ms.

The formula for timer frequency is `16_000_000/((OCR1A+1)*1024)` where `16_000_000` represents the the 16MHz system clock of the ATMega and `1024` is the pre-scaler setting For a 16-bit timer this gives a possible frequency range from 5208 Hz to 0.238Hz. See [the datasheet](/resources#ATMega328P) for a more thorough explanation of AVR timers.

Rather than doing this heavy floating-point math on-device, these were [pre-generated](https://docs.google.com/spreadsheets/d/e/2PACX-1vRYF0LwfJ1-PHLnWnM49WWA0hqCR1MDAl3SorFMbPlyfnnnua1AY_6QSFmG-xYukErxw6XOodOVI3JO/pubhtml) and loaded into flash as a lookup table.

The timer has a maximum error of 0.06% for pulses less than 5 Hz (300 BPM) and less than 0.25% for the maximum pulse rate of 20 Hz.

![BPM vs Error](/images/clock_module_bpm_error.png)

[Swing](https://en.wikipedia.org/wiki/Swing_(jazz_performance_style)) works by alternating each beat between two different timer values. These timer values average to the base clock frequency, but their ratio is controlled by the swing value. At `0`, the beats are even and there is no swing. At maximum value the swing beats are triplets.

<!-- TODO: subdivisions -->

### LEDs

Most 7 segment displays are quite large, too large for our 3HP form factor. However I was able to find some [10mm wide 7-segment displays](/resources#SM460281N) from China. One quirk is despite clearly having a decimal LED, there's no pin exposed for it; just the 7 main segments and the common cathode.

Rather than drive all `7*3 = 21` LEDs at the same time, the microprocessor steps through each display one at a time and sets the character for that display. Not only does this reduce the number of pins required (to `7 + number_of_displays`), it also uses less
power.

The common cathode for the selected display is pulled low, while the common cathode for the other displays remain high. The microprocessor round-robins through each display approximately every 1ms, which is fast enough that our eyes perceive this as a reduction in brightness rather than a blink. With three displays, each display is on 1/3 of the time, cutting the brightness to 33.3%. At higher numbers of displays this solution would start to break down as the brightness would become too low, but for this application it works quite well.

To display a character, each of the 7 segments is controlled by one pin. To optimize performance, all 7 displays are put on the same PORT (in this case `PORTF`) allowing them to be controlled via a single register and therefore set in a single instruction. Every supported character has a 7-bit bit mask that indicates which segments are on or off. For example:

![segment names](/images/7segment-names.png)

```cpp
                   //_ABCDEGF
#define EIGHT      0b01111111 // all the segments on
#define SPACE      0b00000000 // all the segments off
#define ONE        0b00110000
#define UNDERSCORE 0b00001000

void write(uint8_t bitmask)
{
  // We're only using 7 LS bits for controlling
  // the display, the last bit may be used as another
  // IO, so we don't want to overwrite it.
  *_segmentPort = (bitmask & 0b01111111) | (*_segmentPort & 0b10000000);
}
```


### Knob

Rather than a potentiometer, the knob control is a [24-detent rotary encoder](/resources#PEC11R). [Pin-control interrupts](https://www.electrosoftcloud.com/en/pcint-interrupts-on-arduino/) (`PCINT`) detect rotations and keep track of the number of steps. Then the main logic loop polls this and adjusts the parameter as necessary. [This video](https://www.youtube.com/watch?v=v4BbSzJ-hz4) is pretty good at explaining how a rotary encoder works.


### Power supply

While the Eurorack power connector has a 5V power supply line, in this module I'm using the 12V supply line and an [L7805](/resources#LM7805) to regulate the 12V line to 5V. The reason for this is the high current requirements of the display. Most Eurorack power supplies have a lot more current available on the +12V line than on the 5V and -12V lines.

These LEDs have a forward voltage drop of ~2V. With a 1Kohm current limiting resistor, that means each LED is driven with `(5V-2V)/1Kohm = 3mA`. There are two additional LEDs that blink with the outputs. That means even with only one display on at a time the LEDs alone require up to `9 * 3mA = 27mA` at any given time, and that's before factoring in the microprocessor, which is another 10-15mA.

### CV input

This is a digital circuit operating at 5V, but in Eurorack world CV lines are often -10V to 10V. We need to protect our precious microprocessor against a user mistakenly applying a high (or low) voltage to the CV input.

For more precision we could use an op-amp, but here the requirements are minimal and the space is tight, so I opted for a much simpler solution: a diode and voltage divider (D3, R14, R15). The diode protects from negative CV inputs by ensuring the CV is always forward biased. The CV input is unipolar, but if you apply a bipolar CV, the negative components will be treated as 0, no change in tempo. This does effect the bounds slightly, as to overcome the diode, the CV needs to be at least ~1V. However, you can easily tune the base BPM or CV input to account for this.

To protect against voltages of greater than 5V, a simple voltage divider is used. The voltage is scaled by `100Kohm/(100Kohm + 180Kohm) = ~36%`. Thus if you apply the +12V rail to the CV in (the hypothetical highest voltage available in a Eurorack system), the microprocessor's analog input will see 4.39V, comfortably below the 5V supply range.


<!-- LPF? -->
<!-- older rotary encoder designs? -->
<!-- backpack and switching? -->
