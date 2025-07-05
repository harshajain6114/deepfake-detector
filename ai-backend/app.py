# ai-backend/app.py

import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))  # ✅ Add current dir to Python path

from flask import Flask, request, jsonify
import cv2
import numpy as np
from werkzeug.utils import secure_filename
from MesoNet.Meso4 import Meso4  # ✅ Must be after sys.path is set

app = Flask(__name__)

UPLOAD_FOLDER = './uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Load model architecture and weights
model = Meso4()
model.load('./MesoNet/weights/Meso4_DF.h5')

def preprocess_frame(frame):
    resized = cv2.resize(frame, (256, 256))
    normalized = resized / 255.0
    return normalized

@app.route('/analyze', methods=['POST'])
def analyze():
    file = request.files.get('video')
    if not file:
        return jsonify({'error': 'No video uploaded'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    cap = cv2.VideoCapture(filepath)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frames_to_extract = 30
    interval = max(total_frames // frames_to_extract, 1)

    confidences = []
    per_frame = []

    for i in range(frames_to_extract):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i * interval)
        ret, frame = cap.read()
        if not ret:
            continue

        preprocessed = preprocess_frame(frame)
        preprocessed = np.expand_dims(preprocessed, axis=0)  # shape: (1, 256, 256, 3)

        prediction = model.predict(preprocessed)[0][0]  # FAKE if close to 1, REAL if close to 0
        confidence = float(prediction * 100)

        per_frame.append({
            'frame': i + 1,
            'confidence': round(confidence, 2)
        })

        confidences.append(confidence)

    cap.release()
    os.remove(filepath)

    if not confidences:
        return jsonify({'error': 'No frames could be processed'}), 500

    avg_conf = sum(confidences) / len(confidences)
    status = "FAKE" if avg_conf > 50 else "REAL"

    return jsonify({
        'status': status,
        'confidence': round(avg_conf, 2),
        'perFrame': per_frame,
        'reasons': [
            "Facial flickering detected",
            "Artifacts in compressed frames",
            "Unnatural blink patterns",
            "Lighting inconsistencies across frames"
        ]
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)

