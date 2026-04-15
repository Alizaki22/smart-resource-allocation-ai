# 🎨 Frontend – Smart Resource Allocation AI

## 📌 Overview

This is the **frontend application** for the Smart Resource Allocation AI system.

It allows users to:

- Select task **skill type**
- Set **urgency level**
- Get AI-based **task priority prediction**

---

# 🚀 TECH STACK

- React (Vite)
- JavaScript (JSX)
- Axios (API requests)
- CSS (inline styles)

---

# 📂 FOLDER STRUCTURE

```
frontend/
├── src/
│   ├── pages/
│   │   └── Home.jsx        # Main UI component
│   ├── services/
│   │   └── api.js          # API connection to backend
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/
├── package.json
└── README.md
```

---

# 🎯 FEATURES

✅ User-friendly UI
✅ Skill selection (Teaching, Medical, Logistics)
✅ Urgency slider (1–5)
✅ AI prediction result display
✅ Loading state feedback

---

# 🔗 API INTEGRATION

## Endpoint (via backend)

```
POST http://127.0.0.1:5000/predict
```

---

## 📥 Request Format

```json
{
  "skill": number,
  "urgency": number
}
```

---

## 📤 Response Format

```json
{
  "prediction": number
}
```

---

# 🧠 DATA FLOW

```
User Input (Frontend)
        ↓
Frontend (React)
        ↓
Backend API (Flask/Node)
        ↓
AI Model (Python)
        ↓
Prediction Response
        ↓
Frontend UI Display
```

---

# ⚙️ HOW TO RUN FRONTEND

```bash
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# ⚠️ IMPORTANT FOR TEAM

### Backend Developer:

- Must expose endpoint: `/predict`
- Must accept:
  - `skill`
  - `urgency`

- Must return:
  - `prediction`

---

### AI/ML Developer:

- Model must run on:

```
http://127.0.0.1:5001
```

- Backend will call AI model

---

### Database Developer:

- Store:

```json
{
  "skill": number,
  "urgency": number,
  "prediction": number
}
```

---

# 🎨 UI LOGIC

| Field      | Description          |
| ---------- | -------------------- |
| Skill      | Type of task (1–3)   |
| Urgency    | Priority level (1–5) |
| Prediction | AI result (0 or 1)   |

---

# 🎤 DEMO EXPLANATION

> This frontend allows users to input task requirements and uses an AI model to predict whether the task is high or low priority.

---

# 🏁 FINAL NOTES

- Frontend is fully ready for integration
- No changes needed in UI logic
- Ensure backend & AI services are running

---

# 🧠 PRODUCTION NOTE (OPTIONAL UPGRADE)

For production-level applications, it is recommended to migrate to **TypeScript** with type-aware linting.

You can use the official Vite React TypeScript template:
👉 https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts

Benefits:

- Type safety
- Better code quality
- Fewer runtime errors
- Improved team collaboration

Also consider integrating:
👉 https://typescript-eslint.io

---

🔥 Frontend is production-ready for hackathon/demo use account for ues
;/
