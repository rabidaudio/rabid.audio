---
layout: default
title: "Synthesizer - Clock module"
categories:
  - project
  - synthesizer
---

# CLK

This is a clock Eurorack synth module designed to drive sequencers, drum machines, arpeggiators, etc.

It's entirely digital, which makes it an easier module to build since most of the complexity is in software.

[Source files](https://github.com/rabidaudio/synthesizer/tree/clock/clock)

Status: In development. Working on a breadboard, most features software features have been implemented. Awaiting parts to begin PCB layout.

### TODO

- Switch timer to phase-correct PWM mode to reduce glitches
- Store settings in EEPROM
- Add CV input
- Verify on breadboard with ATTiny85 in place of ATMega
- Design and print PCB
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

## Usage

- Turn the knob to control the BPM. LEDs display the current BPM, and decimal points blink with the outputs.
- Apply a unipolar voltage from 0-5V to the CV input to adjust the clock speed. 0V is no additional increase in rate over the knob setting. Each 1V is 64 additional BPM, capped at 300 BPM.
- Tap the tap-tempo button two or more times to set the BPM directly. This effects the base BPM before the CV is applied.
- Hold the tap-tempo button and turn the knob to control the subdivisions. LEDs display the subdivision setting.
- Hold the swing button and turn the knob to control the amount of swing. LEDs display the swing amount from -127 to 127.
- Press both the tap-tempo button and swing button at the same time to reset the subdivision counter and pause the clock. LEDs display `000`.
- Hold both the tap-tempo button and swing button at the same time for 2 seconds to perform a factory reset, returning the BPM, subdivision, and swing settings to the defaults.

## Design

The ATTiny84 is used as the core microprocessor. I often use the ATTiny85 for small microprocessor needs, but here I need a bit more I/O and memory. All I/O pins are utilized in this design.

`Timer1` is a 16-bit timer which is used as the clock core. This way the main loop is free to focus on user input without worrying about timing or performance; `Timer1` will interrupt when it's time to trigger a clock signal. It counts from 0 up to the value in register `OCR1A`, at which point an interrupt is issued and the timer restarts. We bring the clock pin high when the timer is at 0. We use `OCR1B` as a second interrupt at 313 to bring the clock signal low again, creating a fixed pulse width of 20ms.

The formula for timer frequency is `16_000_000/((OCR1A+1)*1024)` where `16_000_000` represents the the 16MHz system clock of the ATTiny and `1024` is the pre-scaler setting For a 16-bit timer this gives a possible frequency range from 5208 Hz to 0.238Hz. See [the datasheet](http://ww1.microchip.com/downloads/en/devicedoc/Atmel-7701_Automotive-Microcontrollers-ATtiny24-44-84_Datasheet.pdf) for a more thorough explanation of AVR timers.

Rather than doing this heavy floating-point math on-device, these were [pre-generated](https://docs.google.com/spreadsheets/d/e/2PACX-1vRYF0LwfJ1-PHLnWnM49WWA0hqCR1MDAl3SorFMbPlyfnnnua1AY_6QSFmG-xYukErxw6XOodOVI3JO/pubhtml) and loaded into flash as a lookup table.

The timer has a maximum error of 0.03% for pulses less than 5 Hz (300 BPM) and less than 0.13% for the maximum pulse rate of 20 Hz.

![BPM vs Error](/images/clock_module_bpm_error.png)

The code uses [PlatformIO](https://platformio.org/) for build tooling. Separate C++ classes encapsulate logic of each of the components, using header-only files to simplify file structure.

Rather than a potentiometer, the knob control is an 8-position continuous turn rotary switch with fixed size resistors between each pole, forming a sort of discrete potentiometer.

![Rotary schematic -halfwidth](/images/clock_module_discrete_potentiometer.png)

This is attached to an ADC input on the ATTiny, and some logic is used to convert this back into an integer switch position, thus only requiring one I/O pin.

Swing works by alternating each beat between two different timer values. These timer values average to the base clock frequency, but their ratio is controlled by the swing value. At `0`, the beats are even and there is no swing. At maximum value the swing beats are triplets.

The 7-segment displays are driven by the [HT16K33](resources#HT16K33) LED driver. LED states are set using I2C. Without it, 30 I/O pins would be required to drive the display.
