import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      totalDuration: null,
      remainingTime: null,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount() {
    if(this.props.totalDuration) {
      this.setState({totalDuration: this.props.totalDuration,
        remainingTime: this.props.totalDuration});
    }

    if(this.props.started) {
      this.start();
    }

    if(this.props.stop) {
      this.stop();
    }

    if(this.props.reset) {
      this.reset();
    }
  }

  componentWillReceiveProps(newProps) {

    if(newProps.totalDuration) {
      this.setState({totalDuration: newProps.totalDuration,
        remainingTime: newProps.totalDuration});
      this.reset();
    }

    if(newProps.start) {
      this.start();
    }

    if(newProps.stop) {
      this.stop();
    }

    if(newProps.reset) {
      this.reset();
    }
  }

  start() {
    this.interval = setInterval(() => {
      if(this.state.remainingTime === 0) {
        this.stop();
        alert("Timer Finished");
        return;
      }
      this.setState({remainingTime: this.state.remainingTime - 1});
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    debugger
    this.stop();
    this.setState({remainingTime: this.state.totalDuration});
  }

  formatTime() {
    let currentRemaining = this.state.remainingTime;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if(currentRemaining >= 3600) {
      hours += Math.floor(currentRemaining / 3600);
      currentRemaining -= hours * 3600;
    }

    if(currentRemaining >= 60) {
      minutes += Math.floor(currentRemaining / 60);
      currentRemaining -= minutes * 60;
    }
    seconds = currentRemaining;
    return `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.timer}>{this.formatTime()}</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    position: 'absolute',
    backgroundColor: '#000',
    top: 80,
    left: 20,
    padding: 5,
    borderRadius: 5,
    width: 300,
  },
  timer: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

export default Timer;
