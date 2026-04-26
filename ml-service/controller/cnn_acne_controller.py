from flask import Blueprint, request, jsonify
from PIL import Image
import numpy as np
import os
import json
from tensorflow.keras.models import load_model

cnn_route = Blueprint("cnn",__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "model", "acne_model.keras"))
CLASS_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "class_names.json"))

try :
    model =load_model(MODEL_PATH)
except Exception as e:
    raise Exception (f"Gagal load model RF : {e}")


@cnn_route.route("/predict", methods=["POST"])
def predict():
    try:
        IMAGE_SIZE = 128
        if "file" not in request.files:
            return jsonify({"kode":400, "error":"file tidak ditemukan"})

        file = request.files["file"]
        img = Image.open(file).resize((IMAGE_SIZE, IMAGE_SIZE))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Hasil prediksi
        prediction = model.predict(img_array)[0]

        # Proses open class json untuk clasifikasi
        with open(CLASS_PATH, "r") as f:
            class_names = json.load(f)

        # Buat list hasil dengan presentase
        results = []
        for i in range(len(class_names)):
            results.append({
                "label": class_names[i],
                "confidence": float(prediction[i] * 100)
            })

        predicted_class_index = np.argmax(prediction)

        return jsonify({
            "kode" : 200,
            "status" : "success",
            "data" : {
                "top_prediction": class_names[predicted_class_index],
                "all_predictions": results
            }
        })
    
    except Exception as e:
        return jsonify({"kode" : 500, "error" : str(e)})
