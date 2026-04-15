const axios = require("axios");

exports.predictTask = async (req, res) => {
  try {
    const { skill, urgency } = req.body;

    // ✅ Validate input
    if (skill === undefined || urgency === undefined) {
      return res.status(400).json({
        success: false,
        error: "skill and urgency are required",
      });
    }

    // ✅ Check API URL
    if (!process.env.FLASK_API) {
      console.log("FLASK_API not set");
      return res.status(500).json({
        success: false,
        error: "Flask API URL not configured",
      });
    }

    let data;

    // ✅ Call AI API (safe)
    try {
      const response = await axios.post(
        process.env.FLASK_API,
        { skill, urgency },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      data = response.data;

    } catch (apiError) {
      console.log("Flask API failed, using fallback");

      // 🔥 Fallback logic (VERY IMPORTANT)
      let prediction = "Low";
      if (urgency >= 4) prediction = "High";
      else if (urgency >= 2) prediction = "Medium";

      data = { prediction };
    }

    let saved = null;

    // ✅ Safe DB save (optional)
    try {
      const Allocation = require("../../database/models/Allocation");

      saved = await Allocation.create({
        userId: null,
        resourceId: null,
        requestData: {
          cpu: skill,
          memory: urgency,
        },
        aiPrediction: {
          allocated: data.prediction === 1 || data.prediction === "High",
          score: 0.9,
        },
        timestamp: new Date(),
      });

    } catch (dbError) {
      console.log("DB not ready:", dbError.message);
    }

    // ✅ Final response (always works)
    return res.json({
      success: true,
      prediction: data,
      savedData: saved || "Not saved",
    });

  } catch (error) {
    console.error("FINAL ERROR:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};