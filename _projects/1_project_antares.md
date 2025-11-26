---
layout: page
title: ANTARES Processing Pipeline
description:     A processing pipeline that converts ANTARES neutrino telescope data (AntDSTs) into a Swim-compatible format. It handles file merging, applies oscillation weights and corrections, and integrates ML-based NNFit reconstructions for analysis.
img: assets/img/projects/antares_schematic.jpg
importance: 1
github: https://github.com/mchadolias/preprocess-antares-dst
category: Physics Research & Computing
related_publications: false
---

## Overview

Pipeline to convert ANTARES event files (`AntDSTs`) into a format compatible with the `Swim` analysis framework. The pipeline processes and merges files, calculates oscillation weights, and integrates reconstructed event data from the `NNFit` algorithm. It has been tested for both Monte Carlo simulation and recorded events.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/flowgraph-preprocess.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>


## Input Files

- **AntDSTs**: ROOT-based summary files containing:
  - Run info & quality parameters
  - MC truth parameters (energy, direction, vertex, weights) -> Only available in MC
  - Reconstructed parameters from algorithms (AAFit, BBFit, GridFit, Showerdusj, Showertantra)

## Pipeline Steps

### 1. File Extraction

- Extract relevant branches from AntDSTs into standard ROOT TTrees.
- Includes:
  - Data quality (DQ) tree: run ID, duration, environmental conditions
  - MC truth tree: true energy, direction, vertex, weights
  - Reconstruction trees: algorithm-specific reconstructed parameters

### 2. Intermediate Merging

- Merge files by event type and run number to reduce file count and improve processing efficiency.
- 15 event categories (e.g., $$\nu_{e}^{CC}$$, $$\nu_{\mu}^{CC}$$, $$\nu_{\tau}^{CCmu}$$, $$\mu$$, etc.)

### 3. Correction & Weight Application

- Apply corrections to reconstruction branches (fix misassigned values).
- Apply weight corrections:
  - 20% reduction for runs < 30412 (early detector overestimation)
  - Data/MC corrections based on year and event type
  - Compute `weight_one_year` for muons

### 4. Oscillation Weight Calculation

- Use `OscProb` library to compute oscillated weights for neutrino events.
- Weights calculated as:
  $$
  w_{\text{osc}} = \frac{w_2}{ngen} \cdot (\Phi_{\nu_e} P_{\nu_e \to \nu_i} + \Phi_{\nu_\mu} P_{\nu_\mu \to \nu_i}) \cdot \text{run_duration}
  $$
- Uses Honda atmospheric flux model and PREM Earth model.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/oscillogram.png" title="example image" class="img-fluid rounded z-depth-1" width="50%"%}
    </div>
</div>

### 5. Second Merging (NNFit Integration)

- Merge files into groups matching `NNFit` HDF5 file structure.
- Classes: `Showers`, `NuMuCC`, `Taus`, `Muons`

### 6. NNFit Branch Addition

- Merge `NNFit` reconstructed parameters into the main ROOT file using:
  - Run ID
  - Frame index
  - Event ID

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/event_distribution.png" title="example image" class="img-fluid rounded z-depth-1" width="80%" %}
    </div>
</div>
<div class="caption">
    This image can also have a caption. It's like magic.
</div>

### 7. Final Merging & Preparation

- Apply selection cuts (e.g., low-energy up-going, NNFit quality cuts).
- Add "MC-truth" branches for perfect reconstruction reference.
- Include detector dimensions (cylinder: $$ z_{\text{min}}, z_{\text{max}}, r $$) for `Swim` compatibility.

## Output

- Single ROOT file containing:
  - True and reconstructed parameters from all algorithms
  - Oscillation and correction weights
  - Classifier and selection cut flags
  - Compatible with `Swim` for sensitivity analysis

## Key Features

- Handles over 300,000 files efficiently
- Supports both neutrino and muon events
- Integrates modern ML-based reconstruction (NNFit)
- Modular and parallelizable via cluster computing