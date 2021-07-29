import { useEffect, useState } from "react";
import "./Animation.css";

function Animation({ index, length, color, changeArray }) {
  // Set the length of the bar to number
  const [len, setLen] = useState(length);

  // If the length is updated change the length
  useEffect(() => {
    setLen(length);
  }, [length]);

  const colors = [
    ["rgba(255, 255, 153, 0.5)", "rgba(255, 255, 153, 0.2)"],
    ["rgba(255, 102, 102, 1)", "rgba(255, 102, 102, 0.5)"],
    ["rgba(112, 219, 112, 0.5)", "rgba(112, 219, 112, 0.2)"],
  ];

  const input = {
    position: "relative",
    top: Math.floor(length / 2) - 12,
    width: length,
    left: -Math.floor(length / 2) + 13,
    border: "none",
    background: "none",
  };

  const bottom = {
    transform: `translateY(${200 - length}px) rotateX(-90deg)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    trasistion: "0.3s",
  };

  const all_sides = {
    height: `${length}px`,
    transform: `translateY(${200 - length}px)`,
    backgroundColor: `${colors[color][0]}`,
    boxShadow: `5px 5px 50px 5px ${colors[color][1]}`,
    trasistion: "0.3s",
  };

  const quantity = {
    position: "relative",
    top: 225,
  };

  // Manual input of value
  const handleChange = (e) => {
    let val = e.target.value;
    // If value is null set to 0
    if (val === "") {
      setLen(0);
      changeArray(index, 0);
    } else {
      val = parseInt(val);
      // if value is greater than the limit set to max
      if (val > 200) {
        setLen(200);
        changeArray(index, 200);
      } else {
        // If the above test casse fails set to current given value
        setLen(val);
        changeArray(index, val);
      }
    }
  };

  // Increment the value by 1
  const increment = (e) => {
    setLen(len + 1);
    changeArray(index, len);
  };

  // Decement the value by 1
  const decrement = (e) => {
    setLen(len - 1);
    changeArray(index, len);
  };

  return (
    <>
      <div className="animation">
        <div className="side top"></div>
        <div className="side bottom" style={bottom}></div>
        <div className="side right">
          <div className="color-bar right-color-bar" style={all_sides}></div>
        </div>
        <div className="side left">
          <div className="color-bar left-color-bar" style={all_sides}></div>
        </div>
        <div className="side front">
          <div className="color-bar front-color-bar" style={all_sides}>
            <input
              type="number"
              length={len}
              style={input}
              value={len}
              className="input"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="side back">
          <div className="color-bar back-color-bar" style={all_sides}></div>
        </div>
        <div className="quantity-nav">
          <div
            className="quantity-button quantity-up"
            style={quantity}
            onClick={increment}
          >
            +
          </div>
          <div
            className="quantity-button quantity-down"
            style={quantity}
            onClick={decrement}
          >
            -
          </div>
        </div>
      </div>
    </>
  );
}

export default Animation;
