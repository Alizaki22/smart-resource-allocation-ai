const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ai_project")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const DataSchema = new mongoose.Schema({
    input: Object,
    prediction: String
});

const Data = mongoose.model("Data", DataSchema);

app.post("/predict", async (req, res) => {
    try {
        const userData = req.body;

        const response = await axios.post(
            "http://127.0.0.1:5000/predict",
            userData
        );

        const prediction = response.data.prediction;

        const newData = new Data({
            input: userData,
            prediction: prediction
        });

        await newData.save();

        res.json({ prediction });

    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});

app.listen(5001, () => {
    console.log("Server running on port 5001");
});