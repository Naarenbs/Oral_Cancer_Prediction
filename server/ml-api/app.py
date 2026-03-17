

from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io


app = Flask(__name__)
CORS(app)


try:
    model = tf.keras.models.load_model('oral_cancer_detection.keras')
    print("✅ Model loaded successfully!")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# --- Health Check Endpoint ---
@app.route('/')
def home():
    return jsonify({"status": "Flask is running successfully!"})

# --- Helper: Image Preprocessing ---
def preprocess_image(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        return img_array
    except Exception as e:
        raise ValueError(f"Error preprocessing image: {e}")

# --- Prediction Endpoint ---
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded."}), 500

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    # Basic validation
    if file.filename == '':
        return jsonify({"error": "Empty filename"}), 400

    try:
        img_array = preprocess_image(file.read())
        prediction = float(model.predict(img_array)[0][0])

        if prediction < 0.5:
            label = "Low Risk (Normal Oral Tissue)"
            recommendations = [
                "✅ Maintain regular dental check-ups every 6 months.",
                "🪥 Continue proper oral hygiene and a healthy diet.",
                "🔍 Monitor your mouth for any unusual patches, sores, or color changes.",
                "📸 If changes persist for over 2 weeks, consult a professional."
            ]
            confidence = (1 - prediction) * 100
        else:
            label = "High Risk (OSCC Detected)"
            recommendations = [
                "⚠️ Immediate consultation with a dental or medical professional is strongly advised.",
                "🧬 Further diagnostic tests like a biopsy may be required.",
                "🚭 Avoid tobacco, alcohol, and any oral irritants.",
                "🕒 Do not delay professional medical attention."
            ]
            confidence = prediction * 100

        return jsonify({
            "diagnosis": label,
            "confidence": round(confidence, 2),
            "recommendations": recommendations
        })


    except Exception as e:
        print(f"❌ Error during prediction: {e}")
        return jsonify({"error": str(e)}), 500

# --- Run Server ---
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
