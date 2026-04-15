from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os

app = Flask(__name__)
CORS(app)

# ✅ Load model safely
model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
with open(model_path, "rb") as model_file:
    model = pickle.load(model_file)
print(f"Loaded model from: {model_path}")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        # ✅ Validation: check if data exists
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # ✅ Validation: required fields
        if "skill" not in data or "urgency" not in data:
            return jsonify({"error": "Missing skill or urgency"}), 400

        skill = data["skill"]
        urgency = data["urgency"]

        # ✅ Validation: correct data type
        if not isinstance(skill, (int, float)) or not isinstance(urgency, (int, float)):
            return jsonify({"error": "Inputs must be numbers"}), 400

        # ✅ Prediction
        prediction = model.predict([[skill, urgency]])
        pred_value = int(prediction[0])

        # ✅ Meaningful output
        task_map = {
            0: "Low priority task",
            1: "High priority urgent task"
        }

        return jsonify({
            "prediction": pred_value,
            "task": task_map.get(pred_value, "Unknown task")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)