from flask import Flask, render_template, request, jsonify
from ultralytics import YOLO
import cv2
import os
import uuid

# App Configuration
app = Flask(__name__)

UPLOAD_FOLDER = "static/uploads"
RESULT_FOLDER = "static/results"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

# Load trained YOLO model
model = YOLO("best.pt")


# Count detected classes
def count_detections(results):

    counts = {
        "D00": 0,
        "D10": 0,
        "D20": 0,
        "D40": 0,
        "OTHER": 0
    }

    class_map = {
        "longitudinal crack": "D00",
        "transverse crack": "D10",
        "alligator crack": "D20",
        "pothole": "D40",
        "other corruption": "OTHER"
    }

    for r in results:

        if r.boxes is None:
            continue

        for cls in r.boxes.cls.tolist():

            name = model.names[int(cls)].lower()

            if name in class_map:
                counts[class_map[name]] += 1
            else:
                counts["OTHER"] += 1

    return counts


# Home page
@app.route("/")
def index():
    return render_template("index.html")


# Image prediction
@app.route("/predict_image", methods=["POST"])
def predict_image():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # Create unique filename
    filename = str(uuid.uuid4()) + ".jpg"

    upload_path = os.path.join(
        UPLOAD_FOLDER,
        filename
    )

    result_path = os.path.join(
        RESULT_FOLDER,
        filename
    )

    # Save uploaded image
    file.save(upload_path)

    # Run YOLO detection
    results = model(
        upload_path,
        conf=0.05
    )

    # Count detections
    counts = count_detections(results)

    # Create annotated image
    annotated = results[0].plot()

    cv2.imwrite(
        result_path,
        annotated
    )

    return jsonify({
        "result_image": "/" + result_path.replace("\\", "/"),
        "counts": counts
    })


# Run Flask application
if __name__ == "__main__":
    app.run(debug=True)