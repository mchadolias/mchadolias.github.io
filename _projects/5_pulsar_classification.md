---
layout: page
title: Pulsar Star Classification
description: Machine learning system for classifying pulsar stars from astronomical data using the HTRU2 dataset
img: assets/webp/pulsar-rotating.webp
importance: 3
category: ML Applications
github: https://github.com/mchadolias/pulsar-classification
related_publications: false
---

## Overview

A comprehensive machine learning system for classifying pulsar stars from astronomical data. This project demonstrates a complete ML pipeline from data acquisition to production deployment, using the HTRU2 dataset to distinguish rare pulsar signals from noise with high accuracy.

**Live Demo**: [ https://huggingface.co/spaces/mchadolias/pulsar-classification-htru2](https://huggingface.co/spaces/mchadolias/pulsar-classification-htru2)

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/pulsar_app_main_page.png" title="Pulsar Classification API" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Project Highlights

### 🎯 Key Features

- **Automated Data Pipeline**: Downloads and preprocesses HTRU2 dataset from Kaggle
- **Multiple ML Models**: Implements and compares Logistic Regression, Random Forest, Gradient Boosting, and XGBoost
- **Hyperparameter Tuning**: Comprehensive GridSearchCV optimization
- **Production API**: FastAPI-based REST API with real-time predictions
- **Docker Deployment**: Containerized application ready for cloud deployment
- **Interactive Documentation**: Swagger UI for easy API testing

### 📊 Model Performance

**Best Model**: XGBoost Classifier

- **ROC-AUC**: 0.9768
- **Recall**: 86.3%
- **Precision**: 92.5%
- **F1-Score**: 89.3%

The model successfully handles significant class imbalance (9.16% pulsars) while maintaining high detection rates and low false positives.

## Technical Implementation

### Dataset & Challenge

- **Source**: HTRU2 Pulsar Dataset (Kaggle)
- **Samples**: 17,898 candidate observations
- **Features**: 8 statistical measures from integrated pulse profiles and DM-SNR curves
- **Challenge**: Highly imbalanced classification (9.16% positive class)

### Machine Learning Pipeline

<div class="row mt-3">
    <div class="col-md-12">
        <ul>
            <li><strong>Data Preprocessing</strong>: Automated download, validation, and standardization</li>
            <li><strong>Model Training</strong>: 4 algorithms with 8-fold cross-validation</li>
            <li><strong>Hyperparameter Optimization</strong>: Grid search for optimal performance</li>
            <li><strong>Model Evaluation</strong>: Comprehensive metrics and feature importance analysis</li>
            <li><strong>Production Deployment</strong>: FastAPI with Docker containerization</li>
        </ul>
    </div>
</div>

### Feature Importance Analysis

**Top features contributing to pulsar classification:**

1. **ip_kurtosis**: 0.4368 (Integrated Profile Kurtosis)
2. **ip_skewness**: 0.3520 (Integrated Profile Skewness)
3. **dm_std**: 0.0678 (DM-SNR Curve Standard Deviation)
4. **ip_std**: 0.0412 (Integrated Profile Standard Deviation)
5. **ip_mean**: 0.0298 (Integrated Profile Mean)

## Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/mchadolias/pulsar-classification.git
cd pulsar-classification

# Install dependencies
uv sync

# Run complete pipeline
uv run python scripts/main.py

# Start API server
uv run python deployment/predict.py
```

### Docker Deployment

```bash
# Build and run container
docker build -t pulsar-classification-api:latest .
docker run -it -p 9696:9696 pulsar-classification-api:latest

# Test API
curl http://localhost:9696/health
```

## API Usage

The deployed API provides several endpoints for real-time pulsar classification:

- `POST /predict` - Single sample classification
- `POST /predict_batch` - Batch predictions
- `GET /health` - Service status check
- `GET /docs` - Interactive API documentation

### Example Prediction

```python
import requests

# Sample pulsar features
features = [99.367, 41.572, 1.547, 4.154, 27.555, 61.719, 2.208, 3.662]

response = requests.post(
    "https://pulsar-classification.fly.dev/predict",
    json={"features": features}
)

print(response.json())
# {"probability": 0.960, "is_pulsar": true}
```

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/projects/pulsar_app_docs.png" title="API Documentation" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

## Business Impact

This system addresses a real astronomical challenge by automating the identification of pulsar stars, which:

- **Reduces manual verification workload** for astronomers
- **Enables faster discovery** of valuable astronomical objects
- **Provides consistent, reproducible** classification results

## Key Technologies

- **Machine Learning**: scikit-learn, XGBoost, pandas, numpy
- **API Development**: FastAPI, Pydantic, Uvicorn
- **Deployment**: Docker, Fly.io
- **Development**: UV package manager, Jupyter notebooks

## Development Status

✅ **Completed**: Data pipeline, model training, API development  
✅ **Deployed**: Production API on Fly.io  
✅ **Documented**: Comprehensive README and examples

---

_This project demonstrates end-to-end machine learning capabilities from research to production deployment. The successful classification of pulsar stars showcases practical application of ML in scientific domains._
