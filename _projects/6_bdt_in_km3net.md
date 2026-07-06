---
layout: page
title: KM3TPI - Tree-based Particle Identification
description: The module being developed to become KM3NeT's standard data-processing and machine-learning pipeline - converting ROOT/DST files into ML-ready Parquet datasets and training XGBoost-based particle identification classifiers, for use on a computing cluster or locally.
img: assets/img/projects/km3tpi-horizontal-dark.svg
importance: 1
github: https://git.km3net.de/mchadolias/km3tpi
category: Physics Research & Computing
related_publications: false
---

## Overview

`km3tpi` (**KM3**NeT **T**ree-based **P**article **I**dentification) is a single-repo toolkit being developed as the standard module for processing KM3NeT neutrino telescope data and training machine-learning classifiers on top of it. It converts ROOT-based DST files into chunked Parquet datasets and ships an XGBoost-based ML layer (Optuna tuning, MLflow tracking, sklearn-pipeline serialization) that consumes those datasets directly, with no re-reading of ROOT files. It is built to run identically in both target environments - **interactively on a laptop** (notebooks, prototyping, small subsets) and **at scale on a computing cluster** (Snakemake with SLURM/HTCondor profiles, CC-IN2P3-scale production) - so the same codebase serves day-to-day development and full mass-production runs.

## Idea Board

The project was scoped around one guiding principle: **one repo to rule them all**, covering both data conversion and machine learning.

- **One repo for all**
  - Data converter
  - Machine learning
- **Agnostic approach** - robust to upstream changes (branch names, detector configuration, ROOT schema)
- **Modular design** (`km3tpi` module)
  - `preprocess` subpackage
  - `ml` subpackage
- **Snakemake compatible**
  - Project organized by dedicated maintainer
  - User friendly for task delegation
- **Environment handling**
  - Conda
  - Singularity/Apptainer
- **Testing & CI/CD**

## Physics Motivation

The neutrino mass ordering (NMO) signature lives in the difference between track-like and shower-like events. Better event classification means tighter NMO constraints. `km3tpi`'s classifier tasks follow directly from this:

- **Neutrino vs. muon**: separate atmospheric neutrinos from the much larger atmospheric muon flux.
- **Track vs. shower**: identify interaction topology in the absence of direct flavor identification.
- **Event vs. noise**: discriminate real events from natural background noise.

Containment/fiducial-volume tagging is identified as a natural future extension within the same architecture.

## Input Files

- **DST ROOT files**: KM3NeT offline files organized by detector run, containing `E` and `T` trees.
  - `E` tree: event-level reconstruction and MC truth (tracks, energy, direction, hits).
  - `T` tree: trigger-level summary quantities (nhits, atot, gandalf features, fit results).
- **Sample types**: `data`, `nu_mc`, `mu_mc`, `noise_mc`.
- Alias schemas are auto-discovered per `(sample, tree)` rather than hardcoded, so the pipeline tolerates upstream branch changes.

## Pipeline Architecture

`km3tpi` is organized as two Snakemake-compatible layers inside one modular package: `km3tpi.preprocess` and `km3tpi.ml`. The output of the first layer (canonical Parquet chunks + manifest/metadata JSON) is exactly the input contract of the second, so the two run as one connected DAG.

### Preprocessing Layer (`km3tpi.preprocess`)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/km3tpi_preprocess_workflow.svg" title="km3tpi preprocessing pipeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

1. **Prepare** - checkpoint stage; splits input files into chunks and writes chunk + discovery manifests.
2. **Discover** - scans a sample of files to identify populated branches and writes alias JSON schemas per tree (`{sample}/E_aliases.json`, `{sample}/T_aliases.json`).
3. **Convert** (per chunk) - one fused, lazy dask-awkward graph: read (`TreeReader` / `uproot.dask`) &rarr; `apply_features` &rarr; attach `sample_type` label &rarr; `ParquetWriter`. Only branches listed in the alias JSON ever touch disk.
4. **Validate** - checks schema consistency across all chunks of a sample, emitting a `_validated` sentinel.
5. **ML Manifest & Metadata** - lightweight JSON manifests (`ml/{dataset}/manifest.json`, `ml/{dataset}/metadata.json`) pointing to chunk directories - no data duplication, pointers + column lists, event counts, and class balance only.

The canonical Parquet output (`parquet/{sample}/chunk_N.parquet`) is a single copy that both feeds into stage 4 and is the only data the ML layer ever reads.

### Machine Learning Layer (`km3tpi.ml`)

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/projects/km3tpi_ml_workflow.svg" title="km3tpi machine learning pipeline" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

Built around a two-tier archetype: `Trainer` (owns tuning/fitting, usable standalone) orchestrated by `MLProcessor` (mirrors the preprocessing `DSTProcessor`; owns dataset loading, MLflow context, evaluation, saving, and diagnostics). Four inputs feed the DAG: the per-model `MLConfig` YAML, the dataset manifest, the dataset metadata, and the Parquet chunks themselves.

1. **Prepare Split** - resolves features against dataset metadata and assigns a by-file train/val/test split, writing `split_manifest.json` as the reproducibility artifact.
2. **Inspect Split** _(side branch)_ - pre-training sanity check (class counts, feature correlations, missingness) summarized to `summary.json`.
3. **Tune** _(conditional)_ - only enters the DAG when `optuna.enabled`; samples params, calls `xgb.train`, prunes with a median pruner, and writes `best_params.json` + `tune_history.json` (optionally a resumable `optuna.db`).
4. **Fit** - final XGBoost training wrapped in an sklearn `Pipeline`, using inverse-frequency class weights for balancing (physical `weight_one_year` livetime weights are carried as a column for evaluation only, never passed to the training objective). Writes `model.pkl` + `model_metadata.json`.
5. **Three downstream consumers** read the fitted model and test split in parallel:
   - **Evaluate** - metrics (accuracy, ROC-AUC, log loss) &rarr; `metrics.json`.
   - **Diagnose** - four diagnostic plots (score histogram, ROC curve, confusion matrix, feature importance) &rarr; `diagnostics/*.png` + `index.json`.
   - **Infer** - per-chunk fan-out scoring &rarr; scored Parquet (and, on the ML pipeline branch, a lightweight ROOT score tree for downstream compatibility).

An MLflow parent run cross-cuts `tune` and `fit` for tracking (nested trials, metrics, artifacts).

## Output

- **Preprocessing**: one canonical Parquet file per chunk, never duplicated; ML datasets reference these via manifest/metadata JSON.
- **Machine Learning**: trained model (`model.pkl` + `model_metadata.json`), evaluation metrics, diagnostic plots, and scored Parquet/ROOT outputs for inference.
- Full run history and metrics are tracked in MLflow; hyperparameter search history is optionally persisted in a resumable Optuna study database.

## Key Features

- **The future data + ML module**: intended as the standard toolkit for KM3NeT data processing and classifier training going forward, not a one-off script - designed to be picked up, extended, and delegated across the collaboration.
- **Cluster-first, laptop-friendly**: the same Snakemake DAG runs locally for development on small subsets and scales to full production on SLURM/HTCondor, with no code changes between the two.
- **One repo, two responsibilities**: data conversion and machine learning live in a single, modular `km3tpi` package (`preprocess` and `ml` subpackages).
- **Agnostic by design**: alias discovery and schema validation make the pipeline robust to upstream ROOT branch changes and detector configuration (ORCA/ARCA).
- **Environment handling**: Conda for development, with an Apptainer/Singularity container planned for full cluster portability.
- **Testing & CI/CD**: fast unit test suite (currently 83 tests, sub-2s wall time) plus demo notebooks (`demo_processing.ipynb`, `demo_ml.ipynb`) for interactive walkthroughs.
- **User-friendly task delegation**: single source-of-truth YAML configuration (`pipeline.yaml` + per-model `config/ml/{model}.yaml`), Sphinx documentation, and a monitor view for pipeline status.

## Status & Roadmap

Preprocessing module, preprocessing pipeline rules, ML module, ML pipeline rules, documentation, environment versioning, and CI/CD (71% coverage) are complete for v1. Active next steps: Singularity container for full cluster compatibility, continued pipeline testing at production scale, and feature engineering/cut selection.

Long-term objectives: a baseline track-vs-shower classifier on &nu;<sub>&mu;</sub>-CC / &nu;<sub>e</sub>-CC samples, a first end-to-end run on full ORCA MC production, checking extension to ARCA, integration into existing collaboration workflows, dedicated MLflow monitoring, first official checks against ORCA23/24 mass production, and extensive documentation for members delegating tasks who are less familiar with Snakemake.
