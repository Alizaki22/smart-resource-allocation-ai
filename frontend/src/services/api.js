import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // backend
});

// ✅ Single clean function
export const predict = async (skill, urgency) => {
  const response = await API.post("/predict", {
    skill: Number(skill),
    urgency: Number(urgency),
  });

  return response.data;
};