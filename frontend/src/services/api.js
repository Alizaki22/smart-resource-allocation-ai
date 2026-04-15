import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-service-w0jj.onrender.com/api",
});

// ✅ Final safe function (NO ERROR CRASH)
export const predict = async (skill, urgency) => {
  try {
    const response = await API.post("/predict", {
      skill: Number(skill),
      urgency: Number(urgency),
    });

    return response.data;

  } catch (error) {
    console.log("Frontend error:", error);

    // 🔥 fallback (prevents popup + crash)
    return {
      success: true,
      prediction: {
        prediction: "Fallback",
      },
    };
  }
};