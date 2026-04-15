const axios = require("axios");
const Allocation = require("../../database/models/Allocation");

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

    // ✅ Call AI API properly
    const response = await axios.post(
      process.env.FLASK_API,
      {
        skill,
        urgency,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // prevent hanging
      }
    );

    const data = response.data;

    let saved = null;

    // ✅ Optional DB save (safe)
    try {
      saved = await Allocation.create({
        userId: null,
        resourceId: null,
        requestData: {
          cpu: skill,
          memory: urgency,
        },
        aiPrediction: {
          allocated: data.prediction === 1,
          score: 0.9,
        },
        timestamp: new Date(),
      });
    } catch (dbError) {
      console.log("DB not ready yet:", dbError.message);
    }

    // ✅ Final response
    return res.json({
      success: true,
      prediction: data,
      savedData: saved || "Not saved (DB pending)",
    });

  } catch (error) {
    // 🔥 Better debugging (VERY IMPORTANT)
    console.error("AI ERROR FULL:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};