import React, { Component, createRef } from "react";

// Algorithms
import BubbleSort from "./algorithms/Bubble";
import MergeSort from "./algorithms/Merge";
import InsertionSort from "./algorithms/Insertion";

// Icons
import Play from "@material-ui/icons/PlayCircleFilledWhite";
import Forward from "@material-ui/icons/SkipNextRounded";
import Backward from "@material-ui/icons/SkipPreviousRounded";
import RotateLeft from "@material-ui/icons/RotateLeft";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";

import Bar from "./components/Animation";
//CSS
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.timeout = createRef();
    this.play = true;
    this.value = 0;
  }
  state = {
    list: [],
    listSteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 8,
    delay: 500,
    algorithm: "Insertion Sort",
    timeouts: [],
  };
  ALGORITHMS = {
    "Bubble Sort": BubbleSort,
    "Merge Sort": MergeSort,
    "Insertion Sort": InsertionSort,
  };

  // Call generateRandomList as the component mounts
  componentDidMount() {
    this.generateRandomList();
  }

  generateSteps = () => {
    // slice to make the copy of array
    let list = this.state.list.slice();
    let steps = this.state.listSteps.slice();
    let colorSteps = this.state.colorSteps.slice();
    // console.log(list, steps, colorSteps + "Before");
    console.log(list);

    this.ALGORITHMS[this.state.algorithm](list, 0, steps, colorSteps);
    // this.ALGORITHMS["Bubble Sort"](list, steps, colorSteps);
    // console.log(list, steps, colorSteps);
    // console.log(list, steps);
    this.setState({
      listSteps: steps,
      colorSteps: colorSteps,
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
    });
  };

  clearColorKey = () => {
    let blankKey = new Array(this.state.count).fill(0);

    this.setState({
      colorKey: blankKey,
      colorSteps: [blankKey],
    });
  };

  // Generate a random number from a specific range of values
  generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Generate random array for sorting
  generateRandomList = () => {
    this.clearTimeouts();
    this.clearColorKey();
    // Number of bars to be generate
    const count = this.state.count;
    // Temporary array to store the values
    const temp = [];
    // For number of count push the random numbers generated to tem array
    for (let i = 0; i < count; i++) {
      temp.push(this.generateRandomNumber(50, 200));
    }
    this.setState(
      {
        // Assigning temp to array
        list: temp,
        listSteps: [temp],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  changeArray = (index, value) => {
    let arr = this.state.list;
    arr[index] = value;
    this.setState(
      {
        list: arr,
        listSteps: [arr],
        currentStep: 0,
      },
      () => {
        this.generateSteps();
      }
    );
  };

  previousStep = () => {
    let currentStep = this.state.currentStep;

    // If at the start of array
    if (currentStep === 0) return;
    // Go back one step
    currentStep -= 1;
    this.value--;
    clearTimeout(this.timeout.current);
    this.setState({
      currentStep: currentStep,
      list: this.state.listSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;

    // If at the end of array
    if (currentStep >= this.state.listSteps.length - 1) return;
    // Increment the step
    this.value++;
    currentStep += 1;
    this.setState({
      currentStep: currentStep,
      list: this.state.listSteps[currentStep],
      colorKey: this.state.colorSteps[currentStep],
    });
  };
  // Animations frame with timeout of delay
  update = (timeouts) => {
    let timeout = setTimeout(() => {
      let steps = this.state.listSteps;
      let colorSteps = this.state.colorSteps;
      let currentStep = this.state.currentStep;
      this.setState({
        list: steps[currentStep],
        colorKey: colorSteps[currentStep],
        currentStep: currentStep + 1,
      });
      timeouts.push(timeout);
    }, this.state.delay);
  };

  refreshPage = () => {
    window.location.reload(false);
  };

  pauseStep = () => {
    clearTimeout(this.timeout.current);
    this.play = true;
  };

  // Loop till the array steps and call animation frames
  step_loop = () => {
    let steps = this.state.listSteps;
    let currentStep = this.state.currentStep;
    let timeouts = [];
    console.log(this.value, steps.length, currentStep);
    this.timeout.current = setTimeout(() => {
      if (this.value < steps.length) {
        this.timeout.current = setTimeout(() => {
          this.update(timeouts);
        }, this.state.delay);
        this.step_loop();
      }
      this.value++;
    }, this.state.delay);

    this.setState({
      timeouts: timeouts,
    });
  };

  start = () => {
    this.clearTimeouts();
    this.step_loop();
    this.play = false;
  };
  render() {
    // Iterate over the bars with map
    let bars = this.state.list.map((value, index) => (
      // Passing the props
      <Bar
        key={index}
        index={index}
        length={value}
        color={this.state.colorKey[index]}
        changeArray={this.changeArray}
      />
    ));

    let playButton;

    // If we are in the final step of the sort show a reset button
    if (this.state.listSteps.length === this.state.currentStep) {
      playButton = (
        <button className="controller" onClick={this.refreshPage}>
          <RotateLeft />
        </button>
      );
    } else {
      if (this.play) {
        playButton = (
          <button className="controller" onClick={this.start}>
            <Play />
          </button>
        );
      } else {
        playButton = (
          <button className="controller" onClick={this.pauseStep}>
            <PauseIcon />
          </button>
        );
      }
    }

    return (
      <div className="app">
        <div className="frame">
          <div className="barsDiv container card">{bars}</div>
        </div>
        <div className="control-pannel">
          <div className="control-buttons">
            <button className="controller" onClick={this.previousStep}>
              <Backward />
            </button>
            {playButton}
            <button className="controller" onClick={this.nextStep}>
              <Forward />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
