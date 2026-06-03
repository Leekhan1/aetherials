import "./App.css";
import { useState } from "react";
import snowpuff from "./assets/image/Snow_Puff__Aetherials_Style_-removebg-preview.png";


function App() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);

  function gainXP() {
    const newXP = xp + 10;
    setXp(newXP);
    if (newXP >= level * 100) {
      setLevel(level + 1);
    }
  }

  return (
    <div>
      <img src={snowpuff} alt="Snow Puff" width="200" />

      <h1>Aetherials</h1>

      <h2>Snow Puff</h2>

      <p>Nível: {level}</p>

      <p>XP: {xp}</p>

      <div className="xp-bar">
        <div
          className="xp-fill"
          style={{ width: `${xp % 100}%` }}
        ></div>
      </div>

      <button onClick={gainXP}>Ganhar XP</button>
    </div>
  );
}

export default App;