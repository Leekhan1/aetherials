import "./App.css";
import { useState, useEffect } from "react";
import snowpuff from "./assets/image/Snow_Puff__Aetherials_Style_-removebg-preview.png";
import frostCub from "./assets/image/Frost Cub.png";
import iceWolf from "./assets/image/Ice Wolf.png";
import lykara from "./assets/image/Lykara.png";


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
    // eslint-disable-next-line
    setMood(newMood);
  }, [energy, level]);

  // Sistema de leveling
  useEffect(() => {
    const xpNeeded = level * 50;

    if (xp >= xpNeeded) {
      // eslint-disable-next-line
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
    if (level >= 7) return lykara;
    if (level >= 5) return iceWolf;
    if (level >= 3) return frostCub;
    return snowpuff;
  };

  const getCreatureName = () => {
    if (level >= 7) return "Lykara";
    if (level >= 5) return "Ice Wolf";
    if (level >= 3) return "Frost Cub";
    return "Snow Puff";
  };

  return (
    <div className="app-container">
      <div className="sprite-frame">
        <img
          src={getSprite()}
          alt={getCreatureName()}
          className={`snowpuff ${mood}`}
          onClick={handleClick}
        />
      </div>

      <h1>Aetherials</h1>
      <div className="status-panel">
        <h2>{getCreatureName()}</h2>
        <p className="level-text">Nível: {level}</p>

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
                background: energy > 70 ? "lime" : energy > 30 ? "orange" : "red",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;