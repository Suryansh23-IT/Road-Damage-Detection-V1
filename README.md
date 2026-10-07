# 🚧 Road Damage Detection V1

A simple **YOLO11-based road damage detection demo** built with Python and Flask.

This project detects common road-surface defects from uploaded images using a custom-trained object detection model and displays the annotated result through a lightweight web interface.

> V1 is an early prototype created to explore AI-based road damage detection before building a larger end-to-end road infrastructure platform.

---

## ✨ Features

- Upload road images through a web interface
- Detect multiple road-damage categories using YOLO11
- Display annotated output with bounding boxes
- Show class-wise detection counts
- Custom-trained model weights included
- Simple Flask-based frontend/backend integration

---

## 🔍 Damage Classes

The model is configured to detect:

- **D00** — Longitudinal Crack
- **D10** — Transverse Crack
- **D20** — Alligator Crack
- **D40** — Pothole
- **Other Corruption**

---

## 🧠 Model & Training

The model was trained using **YOLO11n** with transfer learning.

Training configuration:

- Model: `yolo11n.pt`
- Epochs: `100`
- Image size: `640`
- Batch size: `4`
- Device: `CPU`
- Optimizer: `SGD`

The trained model is stored as:

```text
best.pt
