# 🎨 Frontend – Smart Resource Allocation AI

---

## 📌 Overview

This is the **frontend application** for the Smart Resource Allocation AI system.

It enables users to:

* Select a **task skill type**
* Set an **urgency level**
* Receive an AI-powered **task priority prediction**

---

## 🚀 Tech Stack

* ⚛️ React (Vite)
* 🟨 JavaScript (JSX)
* 🌐 Axios (API requests)
* 🎨 CSS (basic styling)

---

## 📂 Folder Structure

```
frontend/
├── src/
│   ├── pages/
│   │   └── Home.jsx        # Main UI component
│   ├── services/
│   │   └── api.js          # API connection
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/
├── package.json
└── README.md
```

---

## 🎯 Features

* ✅ Clean and user-friendly interface
* ✅ Skill selection (Teaching, Medical, Logistics)
* ✅ Urgency level input (1–5)
* ✅ AI prediction result display
* ✅ Loading and error handling

---

## 🔗 API Integration

### Endpoint (via backend)

```
POST /predict
```

> Base URL is handled via environment configuration

---

### 📥 Request Format

```json
{
  "skill": number,
  "urgency": number
}
```

---

### 📤 Response Format

```json
{
  "prediction": number
}
```

---

## 🧠 Data Flow

```
User Input (Frontend)
        ↓
React UI
        ↓
Backend API (Node.js / Flask)
        ↓
AI Model (Python)
        ↓
Prediction Response
        ↓
Frontend Display
```

---

## ⚙️ Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## ⚠️ Team Integration Guidelines

### 🧩 Backend Developer

* Provide endpoint: `/predict`
* Accept:

  * `skill`
  * `urgency`
* Return:

  * `prediction`

---

### 🤖 AI/ML Developer

* Model should run on:

```
http://127.0.0.1:5001
```

* Backend will communicate with the AI service

---

### 🗄️ Database Developer

Store records in this format:

```json
{
  "skill": number,
  "urgency": number,
  "prediction": number
}
```

---

## 🎨 UI Logic

| Field      | Description          |
| ---------- | -------------------- |
| Skill      | Task type (1–3)      |
| Urgency    | Priority level (1–5) |
| Prediction | AI output (0 or 1)   |

---

## 🎤 Demo Explanation

> This frontend allows users to input task parameters and leverages an AI model to determine whether the task should be prioritized as high or low.

---

## 🏁 Final Notes

* Frontend is **fully ready for integration**
* No changes required in UI logic
* Ensure backend and AI services are running before testing

---

## 🧠 Production Note (Optional Upgrade)

For production-grade applications, consider migrating to **TypeScript**.

👉 https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts
👉 https://typescript-eslint.io

### Benefits:

* Type safety
* Improved code quality
* Better maintainability
* Reduced runtime errors

---

🔥 This frontend is **hackathon-ready, scalable, and production-friendly**.
