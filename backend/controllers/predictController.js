try {
  const inputData = req.body;

  const { data } = await axios.post(process.env.FLASK_API, inputData);

  let saved = null;

  try {
    saved = await Prediction.create({
      inputData,
      result: data
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