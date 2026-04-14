# 🤖 AI/ML Module – Integration Guide

## 📌 Overview

This module provides a **machine learning API** that predicts task priority based on input data.

It is used by the backend to process requests from the frontend.

---

# 🚀 API DETAILS

## 🔗 Endpoint

```
POST http://127.0.0.1:5001/predict
```

---

# 📥 INPUT FORMAT

Send JSON:

```json
{
  "skill": number,
  "urgency": number
}
```

---

# 📤 OUTPUT FORMAT

```json
{
  "prediction": number
}
```

---

# 🧠 FIELD MEANINGS

## Skill Mapping

```
1 = Teaching
2 = Medical
3 = Logistics
```

## Urgency Scale

```
1 = Low
5 = High
```

## Prediction Meaning

```
0 = Low priority task
1 = High priority urgent task
```

---

# ⚙️ HOW TO RUN (FOR TEAM)

```bash
python ai-model/model.py
```

Runs on:

```
http://127.0.0.1:5001
```

---

# 🧪 TEST EXAMPLE

```bash
curl -X POST http://127.0.0.1:5001/predict ^
-H "Content-Type: application/json" ^
-d "{\"skill\":2, \"urgency\":4}"
```

---

# ⚠️ IMPORTANT RULES (VERY IMPORTANT)

* API must be running before backend starts
* Input must be JSON
* Field names must match exactly:

  * `skill`
  * `urgency`

---

# ⚙️ FOR BACKEND DEVELOPER

### What to do:

* Send POST request to `/predict`
* Pass JSON input
* Receive prediction

### Example flow:

```
Frontend → Backend → AI API → Backend → Frontend
```

---

# 🎨 FOR FRONTEND DEVELOPER

### Input fields required:

* skill (number)
* urgency (number)

### Example:

```json
{
  "skill": 2,
  "urgency": 4
}
```

---

# 🗄️ FOR DATABASE DEVELOPER

### Store the following:

```json
{
  "skill": number,
  "urgency": number,
  "prediction": number
}
```

---

# 📂 FILE STRUCTURE

```
ai-model/
├── model.py
├── model.pkl
├── train.py
├── test.json
├── requirements.txt
├── readme.txt
```

---

# 🎯 FINAL NOTE

* This API is **ready for integration**
* No changes required in AI logic
* Focus now on connecting backend and frontend

---

🔥 AI module is complete and ready to use.
