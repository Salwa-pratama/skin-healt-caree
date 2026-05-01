from flask import Blueprint, request, jsonify
from PIL import Image
import numpy as np
import os
import json
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

cnn_route = Blueprint("cnn",__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "model", "acne_model_final.keras"))
CLASS_PATH = os.path.normpath(os.path.join(BASE_DIR, "..", "class_names.json"))

try :
    model = load_model(
        MODEL_PATH,
        custom_objects={'preprocess_input': preprocess_input}
    )
except Exception as e:
    raise Exception (f"Gagal load model CNN : {e}")


@cnn_route.route("/predict", methods=["POST"])
def predict():
    try:
        IMAGE_SIZE = 160
        if "file" not in request.files:
            return jsonify({"kode":400, "error":"file tidak ditemukan"})

        file = request.files["file"]
        if file.filename == '':
            return jsonify({"kode":400, "error":"file tidak valid"})
            
        img = Image.open(file).convert('RGB').resize((IMAGE_SIZE, IMAGE_SIZE))
        img_array = np.array(img, dtype=np.float32)
        img_array = np.expand_dims(img_array, axis=0)
        # Note: predict.ipynb does not call preprocess_input before model.predict
        # It just passes the img_array directly.

        # Hasil prediksi
        predictions = model.predict(img_array)

        # Proses open class json untuk clasifikasi
        with open(CLASS_PATH, "r") as f:
            class_names = json.load(f)

        # Buat list hasil dengan presentase
        results = []
        percentages = []
        for i in range(len(class_names)):
            percentage = float(predictions[0][i] * 100)
            percentages.append(percentage)
            results.append({
                "label": class_names[i],
                "persentase": f"{percentage:.2f}%"
            })

        predicted_class_index = int(np.argmax(percentages))

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
