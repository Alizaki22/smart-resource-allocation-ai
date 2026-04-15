import { useState } from "react";
import { predict } from "../services/api";

function Home() {
  const [form, setForm] = useState({
    skill: "",
    urgency: 3,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.skill || !form.urgency) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await predict(form);
      setResult(res.data.prediction);
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
    setLoading(false);
  };

  return (
    <div style={container}>
      <div style={card}>
        <div style={icon}>🤖</div>

        <h1 style={title}>
          AI Task <span style={{ color: "#60a5fa" }}>Priority</span>
        </h1>

        <h2 style={title2}>Prediction System</h2>

        <p style={subtitle}>
          Analyze task importance using AI based on skill and urgency
        </p>
        {/* Skill */}
        <label style={label}>Select Skill</label>
        <select
          name="skill"
          value={form.skill}
          onChange={handleChange}
          style={input}
        >
          <option value="">Choose skill</option>
          <option value="1">📚 Teaching</option>
          <option value="2">🏥 Medical</option>
          <option value="3">📦 Logistics</option>
        </select>

        {/* Urgency */}
        <label style={label}>Urgency Level (1-5)</label>
        <input
          type="range"
          min="1"
          max="5"
          name="urgency"
          value={form.urgency}
          onChange={handleChange}
        />

        <p style={{ color: "#94a3b8", fontSize: "12px" }}>
          Selected urgency: {form.urgency}
        </p>

        {/* Button */}
        <button style={button} onClick={handleSubmit}>
          {loading ? "Analyzing..." : "Predict Priority"}
        </button>

        {/* Result */}
        {result !== null && (
          <div style={resultBox}>
            {result === 1 ? "🚨 High Priority Task" : "✅ Low Priority Task"}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

/* ---------------- STYLES ---------------- */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
};

const card = {
  background: "rgba(255,255,255,0.05)",
  backdropFilter: "blur(12px)",
  padding: "30px",
  borderRadius: "20px",
  width: "350px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  textAlign: "center",
};

const icon = {
  fontSize: "40px",
  marginBottom: "10px",
};

const title = {
  color: "white",
  marginBottom: "5px",
};

const subtitle = {
  color: "#94a3b8",
  fontSize: "13px",
  marginBottom: "25px",
  lineHeight: "1.5",
};
const label = {
  display: "block",
  textAlign: "left",
  marginBottom: "5px",
  color: "#cbd5f5",
  fontSize: "13px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  background: "#1e293b",
  color: "white",
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg, #3b82f6, #2563eb)",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const resultBox = {
  marginTop: "15px",
  padding: "12px",
  borderRadius: "10px",
  background: "#1e40af",
  color: "white",
  fontWeight: "bold",
};

const title2 = {
  color: "#cbd5f5",
  fontSize: "16px",
  fontWeight: "500",
  marginBottom: "15px",
};
