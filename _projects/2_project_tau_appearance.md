---
layout: page
title: Tau Appearance Measurement
description: This analysis investigates tau neutrino appearance from atmospheric neutrino oscillations using ANTARES. It evaluates reconstruction algorithms, implements quality cuts, and uses a profile likelihood approach to assess sensitivity to the νμ→ντ oscillation channel.
img: assets/img/projects/oscillation_numu_nutau.png
importance: 2
github: https://github.com/mchadolias/tau-appearance-antares
category: Physics Research & Computing
related_publications: false
---

## Overview

This analysis investigates the feasibility of detecting tau neutrino ($\nu_\tau$) appearance in the ANTARES neutrino telescope using 15 years of simulated events. The study focuses on low-energy (10–100 GeV) up-going neutrinos, where neutrino oscillation effects are most significant.

## Key Components

### Neutrino Oscillation Context

Atmospheric neutrinos provide a natural beam for studying neutrino oscillations over a wide range of baselines and energies. The following key aspects define the oscillation context:

<div class="row mt-3">
    <div class="col-md-12">
        <ul>
            <li>Atmospheric neutrinos initially consist of $\nu_e$ and $\nu_\mu$ only</li>
            <li>$\nu_\tau$ appearance is solely due to neutrino oscillations ($\nu_\mu \to \nu_\tau$)</li>
            <li>One of the maxima in the oscillation probability for muon neutrinos occurs at $\sim 20$–$30\ \text{GeV}$ for vertically up-going events</li>
        </ul>
        
        <h5>Three-Flavor Oscillation Probability:</h5>
        <p>The $\nu_\mu \to \nu_\tau$ transition probability is given by:</p>
        $$
        P(\nu_\mu \to \nu_\tau) = 4|U_{\mu3}|^2|U_{\tau3}|^2 \sin^2\left(\frac{\Delta m_{31}^2 L}{4E}\right) + 8|U_{\mu3}U_{\tau3}U_{\mu2}U_{\tau2}|\cos\left(\frac{\Delta m_{31}^2 L}{4E}\right)\sin\left(\frac{\Delta m_{31}^2 L}{4E}\right)\sin\left(\frac{\Delta m_{21}^2 L}{4E}\right)
        $$
        <p>where $U$ is the PMNS mixing matrix, $\Delta m_{ij}^2$ are mass-squared differences, $L$ is the baseline, and $E$ is the neutrino energy.</p>
        
        <h5>Tau Normalization Parameter:</h5>
        $$
        n_\tau = \frac{N_{\text{measured}}}{N_{\text{expected}}}
        $$
    </div>
</div>

### Event Topologies

- **Track-like events**: $\nu_\mu$ CC interactions and $\nu_\tau$ CC decays to muons
- **Shower-like events**: $\nu_e$ CC, all NC interactions, and $\nu_\tau$ CC decays to hadrons/electrons

---

## Reconstruction Algorithms Comparison

We evaluated three distinct algorithms for the event reconstruction, each with unique strengths and limitations for different event topologies and energy regimes with the aim of finding the most suitable for this analysis.

<div class="row">
    <!-- AAFit -->
    <div class="col-md-4">
        <h4>AAFit</h4>
        <ul>
            <li>Traditional maximum likelihood fit optimized for high-energy tracks</li>
            <li>Poor performance for low-energy showers</li>
            <li>Energy overestimation in low-energy regime</li>
            <li>Only 13% of showers remain after quality cuts</li>
        </ul>
    </div>
    
    <!-- BBFit -->
    <div class="col-md-4">
        <h4>BBFit</h4>
        <ul>
            <li>Geometric reconstruction using detector lines as reference</li>
            <li>Better direction resolution than AAFit</li>
            <li>No energy reconstruction capability</li>
            <li>Moderate efficiency for both topologies</li>
        </ul>
    </div>
    
    <!-- NNFit -->
    <div class="col-md-4">
        <h4>NNFit (Neural Network Fit)</h4>
        <ul>
            <li>Machine learning approach with separate models for tracks and showers</li>
            <li><strong>NNFitTrack</strong>: optimized for $\nu_\mu$ CC events</li>
            <li><strong>NNFitShower</strong>: optimized for $\nu_e$ CC and NC events</li>
            <li>Provides error estimates for all reconstructed parameters</li>
            <li>Best direction resolution among all algorithms</li>
            <li>Low efficiency (19.5%) but high quality reconstruction</li>
        </ul>
    </div>
</div>
---

## Cut Selection Strategies

To ensure reconstruction quality and minimize background contamination, we implemented specific selection criteria for each event topology based on reconstruction uncertainties. Several series of cut selection criteria were implemented with the "harshest" and "purest" among them being the following resulting in the smallest event sample.

<div class="row justify-content-sm-center">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/shower_reco_perfomance.png"  class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/track_reco_perfomance.png" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    (Left) perfomance of shower event with <i>NNFitShower</i>, (right) perfomance of track events with  <i>NNFitTrack</i>. 
</div>

### NNFit Quality Cuts

<div class="row mt-3">
    <div class="col-md-6">
        <h5>For tracks:</h5>
        <ul>
            <li>$\sigma_{R,\text{closest}} < 10\ \text{m}$</li>
            <li>$\sigma_{Z,\text{closest}} < 10\ \text{m}$</li>
            <li>$\sigma_{\theta} < 8^\circ$</li>
            <li>$\cos\theta < -0.4$</li>
        </ul>
    </div>
    <div class="col-md-6">
        <h5>For showers:</h5>
        <ul>
            <li>$\sigma_{R,\text{vertex}} < 10\ \text{m}$</li>
            <li>$\sigma_{Z,\text{vertex}} < 10\ \text{m}$</li>
            <li>$\cos\theta < -0.4$</li>
        </ul>
    </div>
</div>

<div class="alert alert-info mt-3">
    <strong>Selection Strategy:</strong> The $\cos\theta < -0.4$ cut selects down-going events where atmospheric muons are the dominant background. The position uncertainty cuts ($\sigma_R, \sigma_Z < 10$ m) ensure that the interaction vertex is well-reconstructed within the detector volume for reliable energy and direction measurement. It should be noted that this strategy employs a set of one-dimensional cuts. Despite their ease of implementation, such cuts are not fully optimized and may leave some performance gains unrealized compared to multivariate approaches.
</div>

---

## Statistical Analysis Method

### $\chi^2$ Profile Likelihood Approach

The analysis uses a Poisson $\chi^2$ statistic to determine sensitivity to $\nu_\tau$ appearance:

$$
\chi^2(\text{model}, \text{data}) =
2 \sum_{i,j} \left[ \left( n^{\text{model}}_{ij} - n^{\text{data}}_{ij} \right)
+ n^{\text{model}}_{ij} \cdot \ln \left( \frac{n^{\text{data}}_{ij}}{n^{\text{model}}_{ij}} \right) \right]
+ \sum_{\alpha} \left( \frac{\alpha_{\text{exp}} - \alpha_{\text{obs}}}{\sigma_\alpha} \right)^2
$$

**Components:**

1. **Statistical term**: Poisson comparison between expected and observed events in each $(E, \theta)$ bin
2. **Systematic term**: Penalty for nuisance parameters deviating from expected values

### TauNorm Scanning Procedure

1. **Free fit**: Find minimum $\chi^2$ with TauNorm unconstrained
2. **Fixed scan**: Calculate $\chi^2$ for TauNorm values from 0 to 2
3. **$\Delta\chi^2$ calculation**: $\Delta\chi^2 = \chi^2_{\text{fixed}} - \chi^2_{\text{free}}$
4. **Significance conversion**: $\sigma = \sqrt{\Delta\chi^2}$

### Asimov Dataset Approach

- Uses expected event counts without statistical fluctuations
- Ensures TauNorm converges to true value ($n_\tau = 1$ for standard oscillations)
- Provides median expected sensitivity

## Sensitivity Results

<div class="row">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/sensitivities_recos.png" title="example image" class="img-fluid rounded z-depth-1"%}
    </div>
</div>

### Algorithm Performance

- **NNFit shows best sensitivity** despite lower efficiency
- **Challenges in energy resolution** for $\nu_\tau$ appearance can be mitigated with proper binnnig
- **Systematic uncertainties significantly impact sensitivity** in full analysis

## Key Challenges and Limitations

1. **Low reconstruction efficiency** for $\nu_\tau$ events (especially with NNFit)
2. **Energy reconstruction difficulties** below $70\ \text{GeV}$
3. **High atmospheric muon background** requiring strict veto cuts
4. **Systematic uncertainties** from flux models and cross-sections
5. **No particle identification capability** in ANTARES

## Conclusion

<p>The analysis demonstrates ANTARES's potential to contribute to $\nu_\tau$ appearance measurements with significance exceeding $6\sigma$ for the chosen dataset and assumptions for the simplification of the problem. In the entire lifetime of the detector, after cut selection more than 300 $\nu_{\tau}$ under CC interactions with shower topology are present, providing <i>more than enough statistics</i> to warrant such an analysis. NNFit provides the <i>best reconstruction performance</i> despite efficiency limitations. The statistical approach using $\chi^2$profile likelihood with systematic uncertainties provides a <i>robust framework</i> for evaluating sensitivity to tau neutrino appearance.</p>.
