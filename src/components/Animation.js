import { useEffect, useState } from "react";

import "./Animation.css";
function Animation({ index, length, color }) {
  const [leng, setLeng] = useState(length);

  const colors = [
    ["rgba(10, 10, 71, 0.5)", "rgba(10, 10, 71, 0.2)"],
    ["rgba(255, 48, 79, 1)", "rgba(255, 48, 79, 0.5)"],
    ["rgba(131, 232, 90, 0.5)", "rgba(131, 232, 90, 0.2)"],
  ];
  const animationStyle = {
    height: length,
  };
  const front_bottom = {
    transform: `translateY(${200 - length}px) rotateX(-90deg)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    trasistion: "0.3s",
  };
  const right_left = {
    height: `${length}px`,
    transform: `translateY(${200 - length}px)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    trasistion: "0.3s",
  };
  const front_back = {
    height: `${length}px`,
    transform: `translateY(${200 - length}px)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    trasistion: "0.3s",
  };
  const inputStyle = {
    position: "relative",
    top: Math.floor(length / 2) - 12,
    width: length,
    left: -Math.floor(length / 2) + 13,
    border: "none",
    background: "none",
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (value === "") {
      setLeng(0);
    } else {
      value = parseInt(value);
      if (value > 150) {
        value = 150;
      } else {
        setLeng(value);
      }
    }
    setLeng(parseInt(e.target.value));
  };

  return (
    <>
      <div className="animation" style={animationStyle}>
        <div className="side top"></div>
        <div className="side bottom" style={front_bottom}></div>

        <div className="side right">
          <div className="color-anim right-color-anim" style={right_left}></div>
        </div>
        <div className="side left">
          <div className="color-anim left-color-anim" style={front_back}></div>
        </div>

        <div className="side front">
          <div className="color-anim front-color-anim" style={front_back}></div>
          <input
            type="number"
            style={inputStyle}
            length={length}
            value={leng}
            className="input"
            onChange={handleChange}
          />
        </div>
        <div className="side back">
          <div className="color-anim back-color-anim" style={front_back}></div>
        </div>
      </div>
    </>
  );
}

export default Animation;
