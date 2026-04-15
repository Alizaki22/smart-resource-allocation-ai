# 🤖 AI/ML Module – Smart Resource Allocation

## 📌 Overview

This module provides a **machine learning API** that predicts task priority based on user input.

It is used by the **backend** to make decisions.

---

# 🚀 API Endpoint

```
POST /predict
```

Base URL (local):

```
http://127.0.0.1:5000/predict
```

---

# 📥 Input Format

Send JSON:

```json
{
  "skill": number,
  "urgency": number
}
```

---

# 📤 Output Format

```json
{
  "prediction": number
}
```

---

# 🧠 Input Meaning

```
skill:
1 = Teaching
2 = Medical
3 = Logistics

urgency:
1 = Low
5 = High
```

---

# ⚙️ How to Run

## 1. Install Dependencies

```bash
pip install pandas numpy scikit-learn flask
```

---

## 2. Run the Model API

```bash
python ai-model/model.py
```

---

## 3. Server Starts At

```
http://127.0.0.1:5000/
```

---

# 🧪 Test Example

```bash
curl -X POST http://127.0.0.1:5000/predict ^
-H "Content-Type: application/json" ^
-d "{\"skill\":2, \"urgency\":4}"
```

---

# ⚠️ Important Notes (For Backend Dev)

* API must be running before calling it
* Input must be JSON
* Keys must be exactly:

  * `"skill"`
  * `"urgency"`

---

# 🧩 Files in This Folder

```
ai-model/
├── model.py        # API server
├── model.pkl       # Trained model
├── train.py        # Model training
├── test.json       # Sample input
├── requirements.txt
```

---

# 🎯 Goal

Provide a **working prediction API** for integration with backend.

---

🔥 This API is ready to use.
