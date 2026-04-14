import { useState } from "react";
import { predict } from "../services/api";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const res = await predict({ input });
    setResult(res.result);
  };

  return (
    <div>
      <h2>Prediction App</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter data"
      />

      <button onClick={handleSubmit}>Submit</button>

      {result && <h3>Result: {result}</h3>}
    </div>
  );
}
