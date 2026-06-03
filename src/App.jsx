import "./App.css";
import { useState, useEffect } from "react";
import snowpuff from "./assets/image/Snow_Puff__Aetherials_Style_-removebg-preview.png";


function App() {
  const [energy, setEnergy] = useState(100);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [mood, setMood] = useState("happy");

  // Queda automática de energia
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => {
        const newEnergy = prev - 2;
        return newEnergy < 0 ? 0 : newEnergy;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Humor baseado na energia (o "cérebro")
  useEffect(() => {
    let newMood = "tired";

    if (energy >= 70) {
      newMood = "happy";
    } else if (energy >= 30) {
      newMood = "neutral";
    }

    // bônus: level alto deixa ele mais "feliz naturalmente"
    if (level >= 3 && energy > 50) {
      newMood = "happy";
    }

    setMood(newMood);
  }, [energy, level]);

  // Sistema de leveling
  useEffect(() => {
    const xpNeeded = level * 50;

    if (xp >= xpNeeded) {
      setXp(0);
      setLevel((l) => l + 1);
    }
  }, [xp, level]);

  // Recuperar energia ao clicar
  function handleClick() {
    // energia sobe um pouco
    setEnergy((e) => Math.min(100, e + 15));

    // XP ganha baseado na energia
    setXp((prev) => prev + (energy > 70 ? 12 : energy > 30 ? 8 : 4));
  }

  const getSprite = () => {
    if (level >= 5) return "snowpuff_evolved3.png";
    if (level >= 3) return "snowpuff_evolved2.png";
    return snowpuff;
  };

  return (
    <div>
      <img
        src={getSprite()}
        alt="Snow Puff"
        className={`snowpuff ${mood}`}
        onClick={handleClick}
      />

      <h1>Aetherials</h1>

      <h2>Snow Puff</h2>

      <p>Nível: {level}</p>

      <div className="xp-section">
        <p>XP: {xp} / {level * 50}</p>
        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{ width: `${(xp / (level * 50)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="energy-section">
        <p>Energia: {energy}%</p>
        <div className="energy-bar">
          <div
            className="energy-fill"
            style={{
              width: `${energy}%`,
              height: "100%",
              background: energy > 70 ? "lime" : energy > 30 ? "orange" : "red",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;