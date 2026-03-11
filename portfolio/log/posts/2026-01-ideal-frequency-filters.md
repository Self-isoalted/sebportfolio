# Ideal frequency filters – overview

**Date:** 2025-03-08  
**Category:** Electronics / Signal Processing

## Introduction

Filters are widely used in electronic systems to control which frequency
components of a signal are passed and which are attenuated. Typical
applications include noise reduction, signal conditioning, and bandwidth
limiting.

This entry summarises the four fundamental types of frequency filters using
idealised frequency responses. These models are not physically achievable,
but they provide a clear conceptual framework for understanding real filters.

---

## Frequency-dependent gain

A filter is a system whose gain depends on frequency.  
For a sinusoidal input signal, the voltage gain is defined as the ratio of the
output amplitude to the input amplitude.

In ideal filter models, the gain is usually shown as unity (gain = 1) in the
passband and zero in the stopband. This convention simplifies comparison
between different filter types.

---

## Ideal filter models

The figure below shows the idealised (“brick-wall”) frequency responses of
the four basic filter types.

![Ideal frequency responses of basic filters](./assets/images/ideal-filters-overview.png)

These responses are called _brick-wall_ characteristics because they assume
perfectly flat passbands and infinitely sharp transitions at the cut-off
frequencies. Such behaviour cannot be achieved in practice but is useful for
understanding filter behaviour.

---

## Low-pass filter

A low-pass filter allows low-frequency signals to pass while attenuating
frequencies above the cut-off frequency \( f_c \).

- Frequencies below \( f_c \) form the passband
- Frequencies above \( f_c \) form the stopband

Low-pass filters are commonly used to remove high-frequency noise or to
limit the bandwidth of a signal before sampling.

---

## High-pass filter

A high-pass filter attenuates low-frequency signals and allows higher
frequencies to pass.

- Frequencies below the cut-off frequency are in the stopband
- Frequencies above \( f_c \) form the passband

High-pass filters are often used to remove DC offsets or low-frequency
interference.

---

## Band-pass filter

A band-pass filter allows only a limited range of frequencies to pass while
attenuating frequencies both below and above this range.

- The passband lies between two cut-off frequencies \( f*{c1} \) and \( f*{c2} \)
- Frequencies outside this range are attenuated

Band-pass filters are commonly used in communication systems to isolate a
signal centred around a specific frequency.

---

## Band-stop (notch) filter

A band-stop, or notch, filter attenuates a specific range of frequencies while
allowing frequencies outside this range to pass.

- The stopband lies between \( f*{c1} \) and \( f*{c2} \)
- Low and high frequencies remain in the passbands

Notch filters are typically used to remove unwanted narrowband interference,
such as mains hum.

---

## Ideal vs real filters

Real filters differ significantly from these ideal models:

- Transitions between passband and stopband are gradual
- There is no perfectly sharp cut-off frequency
- Gain in the stopband is not exactly zero

In practical filters, the cut-off frequency is usually defined as the frequency
at which the power gain drops by 3 dB relative to the passband.

---

## Reflection

Although ideal filter models are theoretical, they provide a useful reference
for analysing and designing real filters. Understanding these models makes
it easier to interpret practical frequency responses and Bode plots.

---

## Next steps

- Analyse a first-order RC low-pass filter
- Compare ideal and real frequency responses
- Study filter roll-off and filter order
