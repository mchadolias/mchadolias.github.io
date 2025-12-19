---
layout: page
title: KM3NeT/ORCA Reconstruction Studies
description: An investigation into energy reconstruction biases for muon neutrinos in the ORCA6 detector. Identified track geometry relative to the sparse detector array as the primary cause of systematic energy miscalibrations.
img: assets/img/projects/orca_event_distribution.png
importance: 3
github: https://github.com/mchadolias/orca6-energy-reconstruction-studies
category: Physics Research & Computing
related_publications: false
---

---

## Overview

This undergraduate internship project within the **KM3NeT Collaboration** focused on performance studies for the **ORCA** (Oscillation Research with Cosmics in the Abyss) neutrino detector. The core objective was to investigate challenges in reconstructing the energy of muon neutrinos using data from an early six-string prototype detector configuration (**ORCA6**). The work involved analyzing Monte Carlo simulations to diagnose a known issue with energy resolution and identify the underlying causes.

## The Challenge

ORCA's goal is to determine the **neutrino mass hierarchy** by measuring oscillations of atmospheric neutrinos. Precise energy reconstruction is critical for this measurement.

Initial analysis revealed a significant problem: in a specific energy range (the **"deep" region** ~35–80 GeV), the reconstruction algorithm systematically estimated neutrino energies to be much **lower** than their true values. This project aimed to uncover which event characteristics were causing this bias, especially given the limited size of the ORCA6 detector.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/orca_event_distribution.png" title="example image" class="img-fluid rounded z-depth-1"  width="90%" %}
    </div>
</div>

## Methodology

The analysis was conducted using the **ROOT** data analysis framework and a custom C++ analysis module (`analyze_orca6_data.cc`). The approach was:

1.  **Data Processing:** Analyze Monte Carlo simulated neutrino events for the ORCA6 configuration, where the true energy is known.
2.  **Variable Correlation:** Study the distribution of key topological variables for events in the "deep" region, comparing three subsets:
    - 🔵 Events reconstructed with **lower** energy.
    - 🟢 Events reconstructed with **correct** energy.
    - 🔴 Events reconstructed with **higher** energy.
3.  **Key Variables:** The study investigated:
    - Reconstructed vertex position (`reco_vrtx_z`, `reco_vrtx_r`)
    - Bjorken-y (inelasticity parameter)
    - Track length
    - Number of detected hits (`Nhits`)
    - **Distance of closest approach** (`d_closest`, `z_closest`) of the track to the detector center.
4.  **Event Visualization:** Configured and used an **Event Display** tool to visually inspect individual events and correlate their geometry with reconstruction quality.

## Key Findings

The analysis identified a strong and clear correlation:

- 🎯 **Primary Cause:** The accuracy of the energy reconstruction is highly dependent on the **track's proximity to the detector center**.
  - Events with a **small distance of closest approach** (`d_closest < 30 m`) were often reconstructed with too little energy.
  - Events with a **large distance of closest approach** (`d_closest > 50 m`), skimming the detector's edge, were consistently reconstructed with **too much energy**. The algorithm overestimates energy when it only detects a short, bright segment of a longer track.
- **Ruled Out Factors:** Variables like the vertex position, Bjorken-y, and zenith angle showed **no significant correlation** with the reconstruction inaccuracy.
- **Conclusion:** The limited **geometric size of the ORCA6 detector** is the dominant factor causing the observed biases in energy resolution. The reconstruction performance is intrinsically linked to the muon track's trajectory through the sparse detector array.

## Significance & Outcome

This study provided crucial insights into the performance limits of the KM3NeT/ORCA detector during its construction phase. The results are valuable for:

- **Algorithm Validation:** Providing a benchmark for understanding and improving energy reconstruction software.
- **Systematic Uncertainty Analysis:** Informing the estimates of systematic errors for ORCA's first physics results.
- **Future Projections:** Establishing a baseline understanding of performance issues that are expected to diminish as the detector is completed to its full 115-string design.

The project also provided extensive hands-on experience with modern high-energy physics data analysis tools and neutrino detector principles.
