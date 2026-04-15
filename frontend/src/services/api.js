import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-service-w0jj.onrender.com/api",
});

// ✅ Single clean function
export const predict = async (skill, urgency) => {
  const response = await API.post("/predict", {
    skill: Number(skill),
    urgency: Number(urgency),
  });

  return response.data;
};