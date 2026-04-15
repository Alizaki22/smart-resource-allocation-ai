import { useState } from "react";
import { predict } from "../services/api";

const priorityConfig = {
  High:   { color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "rgba(239,68,68,0.35)",   label: "HIGH PRIORITY",   icon: "▲" },
  Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.35)",  label: "MED PRIORITY",    icon: "◆" },
  Low:    { color: "#10b981", bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.35)",  label: "LOW PRIORITY",    icon: "▼" },
};

export default function Home() {
  const [form, setForm]       = useState({ skill: "", urgency: 3 });
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.skill) { setTouched(true); return; }
    setLoading(true);
    setResult(null);
    try {
      const res = await predict(form.skill, form.urgency);
      const raw = res?.prediction?.prediction;
      let val = "Unknown";
      if (raw === 1 || raw === "High")   val = "High";
      else if (raw === 0 || raw === "Low")   val = "Low";
      else if (raw === 2 || raw === "Medium") val = "Medium";
      setResult(val);
    } catch {
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  const cfg = result && priorityConfig[result];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: #060b18;
          background-image:
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(30,58,138,0.55) 0%, transparent 65%),
            radial-gradient(ellipse 60% 40% at 90% 100%, rgba(15,118,110,0.2) 0%, transparent 55%);
          font-family: 'Syne', sans-serif;
        }

        .ap-card {
          width: 100%;
          max-width: 420px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 24px;
          padding: 36px 32px 32px;
          backdrop-filter: blur(20px);
          animation: fadeUp 0.5s ease both;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ap-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          color: #60a5fa;
          background: rgba(96,165,250,0.1);
          border: 1px solid rgba(96,165,250,0.25);
          padding: 5px 12px;
          border-radius: 100px;
          margin-bottom: 20px;
        }
        .ap-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #60a5fa;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.35; }
        }

        .ap-title {
          font-size: clamp(26px, 6vw, 32px);
          font-weight: 800;
          color: #f1f5f9;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }
        .ap-title span { color: #60a5fa; }

        .ap-sub {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .ap-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 24px;
        }

        .ap-label {
          display: block;
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .ap-select {
          width: 100%;
          padding: 12px 16px;
          margin-bottom: 4px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: #e2e8f0;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          transition: border-color 0.2s;
        }
        .ap-select:focus { outline: none; border-color: rgba(96,165,250,0.5); }
        .ap-select option { background: #0f172a; }

        .ap-error {
          font-size: 12px;
          color: #f87171;
          margin-bottom: 16px;
          height: 16px;
        }

        .ap-range-wrap { margin-bottom: 24px; }

        .ap-range-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 10px;
        }
        .ap-range-value {
          font-family: 'DM Mono', monospace;
          font-size: 22px;
          font-weight: 500;
          color: #60a5fa;
          line-height: 1;
        }
        .ap-range-max {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #475569;
        }

        .ap-range {
          width: 100%;
          height: 4px;
          appearance: none;
          background: rgba(255,255,255,0.08);
          border-radius: 4px;
          outline: none;
          cursor: pointer;
        }
        .ap-range::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          border: 3px solid #060b18;
          box-shadow: 0 0 0 2px #3b82f6;
          transition: transform 0.15s;
        }
        .ap-range::-webkit-slider-thumb:hover { transform: scale(1.15); }

        .ap-pip-row {
          display: flex;
          justify-content: space-between;
          margin-top: 6px;
        }
        .ap-pip {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #334155;
        }

        .ap-btn {
          width: 100%;
          padding: 14px;
          border-radius: 14px;
          border: none;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s;
          position: relative;
          overflow: hidden;
        }
        .ap-btn:hover:not(:disabled)  { transform: translateY(-1px); opacity: 0.92; }
        .ap-btn:active:not(:disabled) { transform: translateY(0); }
        .ap-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .ap-btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .ap-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .ap-result {
          margin-top: 20px;
          padding: 16px 20px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          gap: 14px;
          animation: fadeUp 0.35s ease both;
        }
        .ap-result-icon {
          font-size: 22px;
          line-height: 1;
          flex-shrink: 0;
        }
        .ap-result-text {}
        .ap-result-eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          opacity: 0.65;
          margin-bottom: 3px;
        }
        .ap-result-value {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .ap-result-error {
          margin-top: 20px;
          padding: 14px 18px;
          border-radius: 14px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.3);
          color: #fca5a5;
          font-size: 13px;
          animation: fadeUp 0.35s ease both;
        }

        @media (max-width: 440px) {
          .ap-card { padding: 28px 20px 24px; border-radius: 20px; }
        }
      `}</style>

      <div className="ap-root">
        <div className="ap-card">

          {/* Badge */}
          <div className="ap-badge">
            <span className="ap-badge-dot" />
            AI · POWERED
          </div>

          {/* Title */}
          <h1 className="ap-title">
            Task <span>Priority</span><br />Prediction
          </h1>
          <p className="ap-sub">
            Analyze task importance using machine learning based on skill type and urgency.
          </p>

          <div className="ap-divider" />

          {/* Skill selector */}
          <label className="ap-label">Skill Type</label>
          <select
            name="skill"
            value={form.skill}
            onChange={handleChange}
            className="ap-select"
          >
            <option value="">Select a skill…</option>
            <option value="1">Teaching</option>
            <option value="2">Medical</option>
            <option value="3">Logistics</option>
          </select>
          <div className="ap-error">
            {touched && !form.skill ? "Please select a skill to continue." : ""}
          </div>

          {/* Urgency slider */}
          <div className="ap-range-wrap">
            <label className="ap-label">Urgency Level</label>
            <div className="ap-range-header">
              <span className="ap-range-value">{form.urgency}</span>
              <span className="ap-range-max">/ 5</span>
            </div>
            <input
              type="range"
              min="1" max="5" step="1"
              name="urgency"
              value={form.urgency}
              onChange={handleChange}
              className="ap-range"
            />
            <div className="ap-pip-row">
              {[1,2,3,4,5].map(n => (
                <span key={n} className="ap-pip">{n}</span>
              ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            className="ap-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="ap-btn-inner">
              {loading ? (
                <><span className="ap-spinner" /> Analyzing…</>
              ) : (
                "Predict Priority"
              )}
            </span>
          </button>

          {/* Result */}
          {result && result !== "Error" && result !== "Unknown" && cfg && (
            <div
              className="ap-result"
              style={{
                background: cfg.bg,
                borderColor: cfg.border,
                color: cfg.color,
              }}
            >
              <span className="ap-result-icon">{cfg.icon}</span>
              <div className="ap-result-text">
                <div className="ap-result-eyebrow">PREDICTION RESULT</div>
                <div className="ap-result-value">{cfg.label}</div>
              </div>
            </div>
          )}

          {result && (result === "Error" || result === "Unknown") && (
            <div className="ap-result-error">
              Unable to connect to the prediction backend. Please try again.
            </div>
          )}

        </div>
      </div>
    </>
  );
}