import "./App.css";
import React, { Component } from "react";
import Animation from "./components/Animation";

class App extends Component {
  state = {
    list: [],
    listSteps: [],
    color: [],
    current: 0,
    count: 7,
    delay: 100,
    algo: "",
    timeouts: [],
  };
  componentDidMount() {
    this.generateRandomList();
  }

  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  generateRandomList = () => {
    const count = this.state.count;
    const tempVal = [];
    for (let i = 0; i < count; i++) {
      tempVal.push(this.generateRandomNumber(20, 150));
    }
    this.setState({
      list: tempVal,
      listSteps: [tempVal],
    });
  };
  render() {
    let animation = this.state.list.map((value, index) => (
      <Animation key={index} index={index} length={value} color={0} />
    ));
    return (
      <div className="app">
        <div className="frame">
          <div className="animsDiv container card">{animation}</div>
        </div>
        <div className="control-pannel">
          <div className="pannel"></div>
        </div>
      </div>
    );
  }
}

export default App;
