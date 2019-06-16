## React Native Stopwatch Timer

A React Native component that provides a stopwatch and timer.

<img width="400px" src="./docs/screenshots/Screen Shot 2016-12-03 at 12.54.31 PM.png" />

### Instructions

```npm install react-native-stopwatch-timer```

```js
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
```

### Options

#### Stopwatch and Timer Options

|Name|Type|Description|Default|
|----|----|-----------|------|
|start|boolean|starts timer/stopwatch if true, stops if false|false|
|reset|boolean|stops timer/stopwatch, resets|false|
|msecs|boolean|includes milliseconds in render of time|false|
|options|object|describes style of rendered timer/stopwatch|see example|
|getTime|function|get the formatted value on each tick|(time) => console.log(time)|
|getMsecs|function|get the number of msecs on each tick|(time) => console.log(time)|


#### Stopwatch Options

|Name|Type|Description|Default|
|----|----|-----------|------|
|laps|boolean|will not count the laps of the stopped stopwatch|false|
|startTime|number|number of milliseconds to start stopwatch from|0|


#### Timer Options

|Name|Type|Description|Default|
|----|----|-----------|------|
|totalDuration|Integer|number of milliseconds to set timer for|0|
|handleFinish|function|function to perform when timer completes|() => alert("Timer Finished")|

### Example

```js
import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

class TestApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
    };
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }

  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }

  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }

  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  
  getFormattedTime(time) {
      this.currentTime = time;
  };

  render() {
    return (
      <View>
        <Stopwatch laps msecs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} />
        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={{fontSize: 30}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={{fontSize: 30}}>Reset</Text>
        </TouchableHighlight>
        <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
          reset={this.state.timerReset}
          options={options}
          handleFinish={handleTimerComplete}
          getTime={this.getFormattedTime} />
        <TouchableHighlight onPress={this.toggleTimer}>
          <Text style={{fontSize: 30}}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.resetTimer}>
          <Text style={{fontSize: 30}}>Reset</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("custom completion function");

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

AppRegistry.registerComponent('TestApp', () => TestApp);

```