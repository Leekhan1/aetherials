import "./App.css";
import { useState, useEffect } from "react";
import snowpuff from "./assets/image/Snow_Puff__Aetherials_Style_-removebg-preview.png";


function App() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState("neutral");

  useEffect(() => {
    const interval = setInterval(() => {
      setMood(() => {
        const rand = Math.random();

        if (rand > 0.75) return "happy";
        if (rand > 0.4) return "neutral";
        return "tired";
      });
    }, 5000); // muda a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  function gainXP() {
    const newXP = xp + 10;
    setXp(newXP);
    if (newXP >= level * 100) {
      setLevel(level + 1);
    }
  }

  return (
    <div>
      <img
        src={snowpuff}
        alt="Snow Puff"
        className={`snowpuff ${mood}`}
      />

      <h1>Aetherials</h1>

      <h2>Snow Puff</h2>

      <p>Nível: {level}</p>

      <div className="xp-section">
        <p>XP: {xp}</p>
        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{ width: `${xp % 100}%` }}
          ></div>
        </div>
      </div>

      <button onClick={gainXP}>Ganhar XP</button>
    </div>
  );
}

export default App;