---
type: post
date: 04/02/2026
tags: 21cm
---

# The Dark Ages 21-cm signal and $\Lambda$ CDM

The period between the formation of the Cosmic Microwave Background (CMB) around redshift $z \approx 1100$ and the first galaxies around $z \approx 30$ is largely unobserved. This "Dark Ages" epoch holds crucial information about the early universe, and one of the most promising ways to probe it is through the 21-cm signal from neutral hydrogen.

In a recent paper, I explored how well existing cosmological constraints from Planck, WMAP, DES, and BAO observations can predict the magnitude and timing of this signal. The central question was: if we take what we already know about $\Lambda$CDM from early-time probes like the CMB and late-time probes like baryon acoustic oscillations, how tightly can we constrain the Dark Ages 21-cm signal? 

While a number of papers have already looked at the implied magnitude of the dark ages 21-cm signal from Planck, none have propogated MCMC chains through to the signal space. By working directly with the MCMC chains rather than a maximum posterior point we can correctly propogate uncertainties through to the functional signal space.

## The Spin Temperature

The 21-cm signal arises from a spin-flip transition in neutral hydrogen, where an electron's spin flips from aligned to anti-aligned with the proton, emitting a 21-cm photon. We quantify the relative number of atoms in each spin state using a **spin temperature** $T_s$:

$$\frac{n_1}{n_0} = 3 \exp\left(-\frac{T_*}{T_s}\right),$$

where $T_*$ is the equivalent temperature of a 21-cm photon, and $n_1$ and $n_0$ are the populations of each spin state.

During the Dark Ages, two processes compete to set the spin temperature:

1. **CMB photons** at 21-cm wavelength couple the spin temperature to the CMB temperature $T_\gamma$
2. **Collisions** between hydrogen atoms couple it to the gas kinetic temperature $T_k$

The resulting spin temperature is given by

$$T_s^{-1} = \frac{T_\gamma^{-1} + x_c T_k^{-1}}{1 + x_c},$$

where $x_c$ is the collisional coupling coefficient.

## The Brightness Temperature

We observe the 21-cm signal as a brightness temperature contrast against the CMB

$$T_{21} = \frac{T_s - T_\gamma}{1+z} \left(1 - \exp(-\tau_{21})\right).$$

In the optically thin limit (valid for the Dark Ages), this simplifies to

$$T_{21} \approx \frac{T_s - T_\gamma}{1+z} \tau_{21}.$$

During the dark ages collisions strongly couple the spin temperature to the gas temperature. The gas cools faster than the CMB due to adiabatic expansion producing an **absorption feature** in the 21-cm signal.

Expanding the optical depth $\tau_{21}$ and assuming a homogeneous intergalactic medium, we get:

$$\begin{aligned}
T_{21} = 54 (1 - x_e) &\frac{1- Y_\mathrm{He}}{0.76} \frac{\Omega_b h^2}{0.02242} \\ & \sqrt{\frac{0.1424}{\Omega_m h^2} \frac{1+z}{40}} \left(1 - \frac{T_\gamma}{T_s}\right) ~\mathrm{[mK]},
\end{aligned}$$

where:
- $\Omega_b$ is the baryon density
- $\Omega_m$ is the total matter density
- $h = H_0/100$ encodes the Hubble constant
- $Y_\mathrm{He}$ is the primordial helium fraction
- $x_e$ is the free electron fraction

## Collisional Coupling

The collisional coupling coefficient is given by:

$$x_c = \frac{T_*}{A_{10} T_\gamma} n_H \left[\kappa_\mathrm{HH} (1 - x_e) + (\kappa_\mathrm{eH} + \kappa_\mathrm{pH}) x_e\right],$$

where $A_{10}$ is the Einstein coefficient for spontaneous emission, $n_H$ is the number density of neutral hydrogen, and $\kappa_\mathrm{HH}$, $\kappa_\mathrm{eH}$, $\kappa_\mathrm{pH}$ are rate coefficients for hydrogen-hydrogen, electron-hydrogen, and proton-hydrogen collisions.

During the Dark Ages, when the ionization fraction $x_e$ is very low, **hydrogen-hydrogen collisions dominate**. The rate coefficients depend on temperature:

$$\begin{aligned}
\kappa_{HH} &= 3.1 \times 10^{-17}~T_k^{0.357}~\exp\left(-\frac{32}{T_k}\right)~\mathrm{[m^3s^{-1}]}, \\
\log \kappa_{eH} &\approx \log \kappa_{pH} = -9.607 + 0.5 \log T_k \exp\left[-\frac{(\log T_k)^{4.5}}{1800}\right]~\mathrm{[m^3s^{-1}]}.
\end{aligned}$$

The neutral hydrogen number density scales with cosmology as

$$n_H = \frac{(1 - Y_\mathrm{He})}{m_p} \frac{3 H_0^2}{8 \pi G} \Omega_b (1 + z)^3,$$

where $G$ is Newton's gravitational constant and $m_p$ is the proton mass.

## Computing the Signal

To evaluate the signal at any redshift, we need the ionization fraction $x_e(z)$ and gas temperature $T_k(z)$. I used two recombination codes to compute these:

- **HYREC-2**: Full radiative transfer with virtually infinite energy levels
- **recfast++**: Simplified 3-level atom model

Both codes give essentially identical results for the Dark Ages redshifts of interest, which is reassuring.

## What Do We Already Know?

Here's where things get interesting. By propagating MCMC chains from Planck, WMAP, DES Y1, and BAO observations through this model, I found that the Dark Ages signal is already remarkably well-constrained:

### Signal Magnitude (using Planck + HYREC-2):
- **Central frequency**: $17.14 \pm 0.03$ MHz
- **Signal depth**: $-44.09 \pm 0.96$ mK

This is striking. Within $\Lambda$CDM, existing cosmological observations tell us:
- The frequency is known to **~0.05 MHz**
- The amplitude is known to **better than 1 mK**

### Understanding the Physics

The signal magnitude depends strongly on three cosmological parameters:

1. **$\Omega_b$ (baryon density)**: Higher values → stronger collisional coupling → deeper absorption
2. **$H_0$ (expansion rate)**: Higher values → faster expansion → earlier decoupling → shallower signal
3. **$\Omega_m$ (matter density)**: Higher values → faster expansion → shallower signal

Planck and WMAP provide the tightest constraints because they directly probe early-universe physics. BAO observations favour slightly higher $\Omega_m$, predicting shallower features. DES permits larger $H_0$ but shows $H_0$-$\Omega_b$ correlations that partially cancel in their effect on signal amplitude.

All four probes agree within ~2σ, which is a nice consistency check for $\Lambda$CDM across cosmic time.

## What Does This Mean for Lunar Missions?

These constraints have important practical implications for proposed lunar missions like CosmoCube, FarView, and LCRT:

1. **Optimize around 17 MHz** ($z \approx 85$) — we know where to look
2. **Calibration requirements are severe**: To compete with Planck's constraints, missions need **sub-mK calibration**. This is far more challenging than the ~25 mK targeted by ground-based Cosmic Dawn experiments.
3. The signal-to-noise requirement is roughly **SNR ~ 8** (assuming 44 mK depth)

To put this in perspective: ground-based Cosmic Dawn experiments targeting the much deeper ~200 mK signal aim for ~25 mK calibration (SNR ~ 8). To achieve similar SNR for the Dark Ages, lunar missions need $44/8 \approx 5.5$ mK calibration. To be competitive with Planck, they need **better than 1 mK**.

That's... daunting. Especially when you add in the larger foregrounds at lower frequencies, extreme temperature swings in lunar orbit, and severe mass/power constraints.

## Looking Ahead

The Dark Ages 21-cm signal remains one of the most promising probes of the pre-stellar universe. While detection will be challenging, we now know with remarkable precision what $\Lambda$CDM predicts.

The thing that excites me about this work is what it means for the discovery space. Any significant deviation from these predictions would signal new physics — perhaps the key to resolving the Hubble tension, or uncovering the nature of dark matter through baryon-dark matter interactions, or revealing an excess radio background from primordial black holes or cosmic strings.

Standard $\Lambda$CDM is well-constrained. The real question is: what lies beyond?

---

The code for this analysis is publicly available at [github.com/htjb/existing-probes-dark-ages](https://github.com/htjb/existing-probes-dark-ages) and archived at [doi.org/10.5281/zenodo.17910173](https://doi.org/10.5281/zenodo.17910173).
