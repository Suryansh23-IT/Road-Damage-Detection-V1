<div align="center">

# 🚧 Road Damage Detection V1

### YOLO11-powered road damage detection with a simple Flask web interface

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![YOLO](https://img.shields.io/badge/YOLO11-111111?style=for-the-badge)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![Computer Vision](https://img.shields.io/badge/Computer%20Vision-0A66C2?style=for-the-badge)

<br/>

> A lightweight AI prototype for detecting cracks and potholes from road images.

</div>

---

## ✨ Overview

**Road Damage Detection V1** is an early computer vision prototype built to explore how AI can identify common road defects from images.

The project combines:

**YOLO11 model training → Flask backend → Web interface → Annotated detections**

This version is mainly focused on validating the complete AI detection pipeline before moving toward a larger road-infrastructure platform.

---

## 🔍 Detects

| Code | Damage Type |
|------|-------------|
| D00 | Longitudinal Crack |
| D10 | Transverse Crack |
| D20 | Alligator Crack |
| D40 | Pothole |
| — | Other Corruption |

---

## ⚡ Features

- 🖼️ Upload road images
- 🤖 YOLO11-based object detection
- 🎯 Bounding-box visualization
- 📊 Class-wise damage counts
- 🌐 Flask-powered web interface
- 🧠 Custom-trained model weights
- 🛠️ Training and dataset-conversion scripts included

---

## 🧠 Model

```text
Base Model     : YOLO11n
Epochs         : 100
Image Size     : 640
Batch Size     : 4
Optimizer      : SGD
Training       : CPU
Weights        : best.pt
