from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

model = pickle.load(open("ai-model/model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    skill = data["skill"]
    urgency = data["urgency"]

    prediction = model.predict([[skill, urgency]])

    return jsonify({
        "prediction": int(prediction[0])
    })

if __name__ == "__main__":
    app.run(port=5000)
