---
layout: page
title: Space Environment Analysis for AcubeSAT
description: 
img: assets/img/projects/acubesat.png
importance: 5
category: work
related_publications: false
---

## Overview
This project focused on the **radiation environment characterization of AcubeSAT**, a 3U CubeSat developed by the [SpaceDot](https://spacedot.gr) team at Aristotle University of Thessaloniki.  

## The Challenge

The main goals were:
- To quantify the **radiation flux** (trapped particles, solar energetic particles, galactic cosmic rays) along a potential Sun-Synchronous Low Earth Orbit (SSO ~500–600 km) or a deployment from the International Space Stasion (ISS).
- To estimate the **Total Ionizing Dose (TID)** and **Linear Energy Transfer (LET)** on critical spacecraft subsystems.  
- To evaluate **component survivability** and suggest **shielding strategies** ensuring mission success.

---

## Methodology
A combined approach was adopted, using **analytical models** for flux predictions and **Monte Carlo simulations** for detailed subsystem analysis:

- **OMERE**  
  - Defined orbital parameters for the different deployment scenarios.  
  - Modeled trapped particles (AE8/AP8 models), solar particles, and galactic cosmic rays (ISO-15390 model).  
  - Calculated flux, fluence, LET, and TID for simplified spherical geometries to establish baseline estimates.  

- **FASTRAD**  
  - Imported CAD-based spacecraft geometries for **3D radiation transport**.  
  - **Ray-Tracing Method (RTC):** estimated shielding effectiveness by analyzing path lengths through materials, producing a *sector shielding map* of radiation exposure.  
  - **Forward Monte Carlo (FMC):** simulated particle propagation statistically, calculating the *local deposited dose* in specific components (e.g., OBC PCB, payload electronics).  
  - Enabled visualization of dose depth curves, dose uniformity, and weak points in the satellite’s structure.  

This hybrid methodology allowed **cross-validation** between analytical and numerical results: OMERE provided quick global estimates, while FASTRAD offered **granular, geometry-aware predictions** essential for risk assessment.

---

## Results

- **Flux Distribution**  
  Simulations showed that the **dominant contributor to radiation dose** in LEO is from **trapped protons and electrons**, especially when crossing the South Atlantic Anomaly (SAA).  

<div class="row">
  <div class="col-sm mt-3 mt-md-0">
      {% include figure.liquid loading="eager" path="assets/img/projects/trapped_particles_flux.png" class="img-fluid rounded z-depth-1" width="80%" %}
  </div> 
</div> 
<div class="caption">
    Flux distribution along orbit, with the higher rates of particles in the South Atlantic Anomaly.
</div>

- **Dose Estimates**  
  - For mission durations of **1–1.5 years**, the **TID** remained below the tolerance thresholds of most **COTS components**.  
  - **Monte Carlo simulations** identified non-uniform dose deposition, with sensitive regions like the **On-Board Computer PCB** receiving higher localized doses.  
  

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/dose_depth_curve.png"  class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/sector_analysis_obc_mp.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (Right) dose depth curve of the total ionizing dose as a function of aluminium shield thickness, (left) 3D distribution of the deposited dose along the satellite. 
</div>



---

## Conclusion
- **Trapped particles** are the primary source of ionizing dose for AcubeSAT’s orbit.  
- The **simulated radiation levels** are within survivability limits for the satellite’s electronics, indicating that **AcubeSAT can remain operational throughout its planned mission lifetime**.  
- The study demonstrated the effectiveness of **Monte Carlo methods** for subsystem-level analysis, guiding shielding optimization and reliable component selection.  

---
