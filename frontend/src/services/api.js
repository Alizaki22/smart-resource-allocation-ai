import axios from "../../m.node_modules/axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // backend URL
});

export const predict = (data) => {
  return API.post("/predict", {
    skill: Number(data.skill),
    urgency: Number(data.urgency),
  });
};
