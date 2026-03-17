# Oral Cancer Prediction

This repository contains machine learning models and scripts for predicting and classifying Oral Squamous Cell Carcinoma (OSCC) versus Normal tissue from images.

## Datasets
The project uses the following datasets:
- [Mendeley Data](https://data.mendeley.com/datasets/bbmmm4wgr8/4)
- [Kaggle Dataset](https://www.kaggle.com/datasets/ashenafifasilkebede/dataset)

## Project Overview
The model architectures are built using TensorFlow and Keras. We leverage transfer learning using a pre-trained **DenseNet121** model to classify oral tissue images into two categories:
- `Normal`
- `OSCC` (Oral Squamous Cell Carcinoma)

## Files inside the Repository
- `oral_cancer1.py`: The main Python script containing data preprocessing, model building (DenseNet121), training, and evaluation code.
- `Oral cancer .ipynb`: Jupyter Notebook for experimental data exploration and preliminary modeling.
- `Oral_Canncer_improved2.ipynb`: An improved version of the Jupyter Notebook containing fine-tuned model architectures and additional evaluation metrics.
- `Predicting model .ipynb`: A notebook designated for loading the trained model and making predictions on new test images.

## Dependencies
The project requires the following libraries:
- `tensorflow` / `keras`
- `opencv-python` (`cv2`)
- `pandas`
- `numpy`
- `matplotlib`
- `seaborn`
- `scikit-learn`
- `tqdm`

## Evaluation Metrics
The models are evaluated using metrics such as:
- Accuracy
- Loss (Categorical Cross-Entropy)
- Sensitivity / Specificity
- AUC (Area Under the Curve)
- Confusion Matrix & Classification Report

## Usage
1. Clone the repository.
2. Ensure you have the required dependencies installed.
3. Download the datasets and place them in the appropriate `/content/train`, `/content/test`, and `/content/val` directories.
4. Run `oral_cancer1.py` or the Jupyter Notebooks to train the model.
5. The best model weights will be saved as `Oral_Cancer_Detection_Model.h5`.
