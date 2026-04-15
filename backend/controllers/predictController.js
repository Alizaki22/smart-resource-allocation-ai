const axios = require("axios");
const Allocation = require("../../database/models/Allocation");

exports.predictTask = async (req, res) => {
  try {
    const inputData = req.body;

    const { data } = await axios.post(process.env.FLASK_API, inputData);

    let saved = null;

    try {
      saved = await Allocation.create({
  userId: null, // or test user later
  resourceId: null,
  requestData: {
    cpu: inputData.skill,
    memory: inputData.urgency
  },
  aiPrediction: {
    allocated: data.prediction === 1,
    score: 0.9 // or from AI later
  },
  timestamp: new Date()
});
    } catch (dbError) {
      console.log("DB not ready yet");
    }

    res.json({
      success: true,
      prediction: data,
      savedData: saved || "Not saved (DB pending)"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};