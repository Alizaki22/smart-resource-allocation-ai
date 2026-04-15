import { useState } from "react";
import { predict } from "../services/api";

const priorityConfig = {
  High: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.35)",
    label: "HIGH PRIORITY",
    icon: "▲",
  },
  Medium: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.35)",
    label: "MED PRIORITY",
    icon: "◆",
  },
  Low: {
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    border: "rgba(16,185,129,0.35)",
    label: "LOW PRIORITY",
    icon: "▼",
  },
};

export default function Home() {
  const [form, setForm] = useState({ skill: "", urgency: 3 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.skill) {
      setTouched(true);
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await predict(form.skill, form.urgency);
      const raw = res?.prediction?.prediction;
      let val = "Unknown";
      if (raw === 1 || raw === "High") val = "High";
      else if (raw === 0 || raw === "Low") val = "Low";
      else if (raw === 2 || raw === "Medium") val = "Medium";
      setResult(val);
    } catch {
      setResult("Error");
    } finally {
      setLoading(false);
    }
  };

  const cfg = result && priorityConfig[result];

  const urgencyLabels = {
    1: "Minimal",
    2: "Low",
    3: "Moderate",
    4: "High",
    5: "Critical",
  };
  const urgencyColors = {
    1: "#22d3ee",
    2: "#34d399",
    3: "#a78bfa",
    4: "#fb923c",
    5: "#f43f5e",
  };
  const urgencyColor = urgencyColors[form.urgency] || "#a78bfa";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 16px;
          background: #080c14;
          font-family: 'Outfit', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ambient orbs */
        .ap-root::before,
        .ap-root::after {
          content: '';
          position: fixed;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .ap-root::before {
          width: 600px; height: 600px;
          top: -200px; right: -200px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
        }
        .ap-root::after {
          width: 500px; height: 500px;
          bottom: -180px; left: -180px;
          background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
        }

        /* Subtle grid texture */
        .ap-grid {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 0;
          pointer-events: none;
        }

        .ap-card {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 1;
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Top accent bar */
        .ap-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #06b6d4, #a855f7);
          border-radius: 3px 3px 0 0;
        }

        .ap-card-inner {
          background: rgba(13,18,30,0.95);
          border: 1px solid rgba(255,255,255,0.07);
          border-top: none;
          border-radius: 0 0 24px 24px;
          padding: 32px 32px 28px;
          backdrop-filter: blur(24px);
        }

        /* Header */
        .ap-header {
          margin-bottom: 28px;
        }

        .ap-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .ap-eyebrow-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #6366f1;
          box-shadow: 0 0 8px rgba(99,102,241,0.8);
          animation: dotPulse 2.4s ease infinite;
        }
        @keyframes dotPulse {
          0%,100% { box-shadow: 0 0 8px rgba(99,102,241,0.8); }
          50%      { box-shadow: 0 0 16px rgba(99,102,241,0.4); }
        }
        .ap-eyebrow-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          color: #6366f1;
          text-transform: uppercase;
          font-weight: 500;
        }

        .ap-title {
          font-size: 34px;
          font-weight: 900;
          color: #f8fafc;
          line-height: 1.1;
          letter-spacing: -0.03em;
          margin-bottom: 8px;
        }
        .ap-title-accent {
          background: linear-gradient(135deg, #818cf8, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ap-sub {
          font-size: 13.5px;
          color: #475569;
          line-height: 1.65;
          font-weight: 400;
        }

        /* Divider */
        .ap-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
          margin: 24px 0;
        }

        /* Form fields */
        .ap-field { margin-bottom: 22px; }

        .ap-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 10px;
        }
        .ap-label-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.05);
        }

        .ap-select-wrap { position: relative; }

        .ap-select {
          width: 100%;
          padding: 13px 44px 13px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: #e2e8f0;
          font-family: 'Outfit', sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          cursor: pointer;
          appearance: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .ap-select:focus {
          outline: none;
          border-color: rgba(99,102,241,0.5);
          background: rgba(99,102,241,0.04);
        }
        .ap-select option { background: #0d1226; }

        .ap-select-chevron {
          position: absolute;
          right: 14px; top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #475569;
          font-size: 11px;
        }

        .ap-error {
          font-size: 12px;
          color: #f87171;
          margin-top: 6px;
          min-height: 16px;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Urgency slider */
        .ap-urgency-display {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .ap-urgency-num {
          font-size: 44px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.04em;
          transition: color 0.3s;
          color: ${urgencyColor};
        }
        .ap-urgency-meta {
          text-align: right;
        }
        .ap-urgency-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 6px;
          transition: background 0.3s, color 0.3s, border-color 0.3s;
          border: 1px solid;
          display: inline-block;
        }
        .ap-urgency-max {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #334155;
          margin-top: 4px;
          display: block;
          text-align: right;
        }

        .ap-range {
          width: 100%;
          height: 3px;
          appearance: none;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
          transition: background 0.3s;
        }
        .ap-range::-webkit-slider-thumb {
          appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          border: 3px solid #080c14;
          transition: transform 0.15s, box-shadow 0.2s;
        }
        .ap-range::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .ap-range::-webkit-slider-thumb:active { transform: scale(1.1); }

        .ap-pips {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
        }
        .ap-pip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: #1e293b;
          letter-spacing: 0.05em;
        }

        /* Submit button */
        .ap-btn {
          width: 100%;
          padding: 15px;
          border-radius: 12px;
          border: none;
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.02em;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s, box-shadow 0.2s;
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #0891b2 100%);
          box-shadow: 0 4px 24px rgba(79,70,229,0.35);
          position: relative;
          overflow: hidden;
        }
        .ap-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          border-radius: inherit;
        }
        .ap-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(79,70,229,0.45);
        }
        .ap-btn:active:not(:disabled) { transform: translateY(0); }
        .ap-btn:disabled { opacity: 0.5; cursor: not-allowed; box-shadow: none; }

        .ap-btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }
        .ap-btn-icon {
          font-size: 16px;
          transition: transform 0.2s;
        }
        .ap-btn:hover:not(:disabled) .ap-btn-icon { transform: translateX(3px); }

        .ap-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Result card */
        .ap-result {
          margin-top: 20px;
          padding: 18px 20px;
          border-radius: 14px;
          border: 1px solid;
          display: flex;
          align-items: center;
          gap: 16px;
          animation: resultIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
          position: relative;
          overflow: hidden;
        }
        .ap-result::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: currentColor;
          opacity: 0.7;
        }
        @keyframes resultIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ap-result-icon {
          font-size: 26px;
          line-height: 1;
          flex-shrink: 0;
          filter: drop-shadow(0 0 6px currentColor);
        }
        .ap-result-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.18em;
          opacity: 0.55;
          margin-bottom: 4px;
          text-transform: uppercase;
        }
        .ap-result-value {
          font-size: 19px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .ap-result-error {
          margin-top: 20px;
          padding: 15px 18px;
          border-radius: 14px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
          font-size: 13px;
          font-family: 'JetBrains Mono', monospace;
          animation: resultIn 0.35s ease both;
        }

        /* Footer */
        .ap-footer {
          margin-top: 20px;
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #1e293b;
          letter-spacing: 0.08em;
        }

        @media (max-width: 460px) {
          .ap-card-inner { padding: 24px 20px 22px; }
          .ap-title { font-size: 28px; }
          .ap-urgency-num { font-size: 36px; }
        }
      `}</style>

      <div className="ap-root">
        <div className="ap-grid" />

        <div className="ap-card">
          <div className="ap-accent-bar" />
          <div className="ap-card-inner">
            {/* Header */}
            <div className="ap-header">
              <div className="ap-eyebrow">
                <span className="ap-eyebrow-dot" />
                <span className="ap-eyebrow-text">ML · Inference Engine</span>
              </div>
              <h1 className="ap-title">
                Task <span className="ap-title-accent">Priority</span>
                <br />
                Prediction
              </h1>
              <p className="ap-sub">
                Classify task importance with a trained ML model — input skill
                type and urgency to get an instant priority verdict.
              </p>
            </div>

            <div className="ap-divider" />

            {/* Skill selector */}
            <div className="ap-field">
              <div className="ap-label">
                Skill Type
                <span className="ap-label-line" />
              </div>
              <div className="ap-select-wrap">
                <select
                  name="skill"
                  value={form.skill}
                  onChange={handleChange}
                  className="ap-select"
                >
                  <option value="">Choose a skill…</option>
                  <option value="1">Teaching</option>
                  <option value="2">Medical</option>
                  <option value="3">Logistics</option>
                </select>
                <span className="ap-select-chevron">▾</span>
              </div>
              <div className="ap-error">
                {touched && !form.skill ? "⚠ Select a skill to continue" : ""}
              </div>
            </div>

            {/* Urgency slider */}
            <div className="ap-field">
              <div className="ap-label">
                Urgency Level
                <span className="ap-label-line" />
              </div>

              <div className="ap-urgency-display">
                <span
                  className="ap-urgency-num"
                  style={{ color: urgencyColor }}
                >
                  {form.urgency}
                </span>
                <div className="ap-urgency-meta">
                  <span
                    className="ap-urgency-tag"
                    style={{
                      color: urgencyColor,
                      borderColor: `${urgencyColor}55`,
                      background: `${urgencyColor}11`,
                    }}
                  >
                    {urgencyLabels[form.urgency]}
                  </span>
                  <span className="ap-urgency-max">out of 5</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="5"
                step="1"
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="ap-range"
                style={{
                  background: `linear-gradient(90deg, ${urgencyColor} ${(form.urgency - 1) * 25}%, rgba(255,255,255,0.08) ${(form.urgency - 1) * 25}%)`,
                }}
              />
              <style>{`
                .ap-range::-webkit-slider-thumb {
                  background: ${urgencyColor};
                  box-shadow: 0 0 0 4px ${urgencyColor}33;
                }
              `}</style>

              <div className="ap-pips">
                {[1, 2, 3, 4, 5].map((n) => (
                  <span key={n} className="ap-pip">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              className="ap-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              <span className="ap-btn-inner">
                {loading ? (
                  <>
                    <span className="ap-spinner" /> Analyzing…
                  </>
                ) : (
                  <>
                    Run Prediction <span className="ap-btn-icon">→</span>
                  </>
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
                <div>
                  <div className="ap-result-eyebrow">Prediction Result</div>
                  <div className="ap-result-value">{cfg.label}</div>
                </div>
              </div>
            )}

            {result && (result === "Error" || result === "Unknown") && (
              <div className="ap-result-error">
                ✕ Unable to connect to prediction backend. Please try again.
              </div>
            )}
          </div>

          <div className="ap-footer">POWERED BY SCIKIT-LEARN · model.pkl</div>
        </div>
      </div>
    </>
  );
}
