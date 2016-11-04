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
      this.reset(this.props.totalDuration);
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
      this.setState({remainingTime: this.state.remainingTime - 50});
    }, 50);
  }

  //system.time
  //remaining - (last time - current time)
  //current = remaining

  stop() {
    clearInterval(this.interval);
  }

  reset(duration) {
    this.stop();
    this.setState({remainingTime: duration});
  }

  formatTime() {

    let now = this.state.remainingTime;
    let msecs = now % 1000;

    if(msecs < 10) {
      msecs = `00${msecs}`;
    } else if(msecs < 100) {
      msecs = `0${msecs}`;
    }

    let seconds = Math.floor(now / 1000);
    let minutes = Math.floor(now / 60000);
    let hours = Math.floor(now / 3600000);
    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);

    let formatted;

    if(this.props.msecs) {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
        0 : ""}${minutes}:${seconds < 10 ?
          0 : ""}${seconds}:${msecs}`;
    } else {
      formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ?
        0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    }

    return formatted;
  }

  render() {

    const styles = this.props.options ? this.props.options : defaultStyles;

    return(
      <View style={styles.container}>
        <Text style={styles.timer}>{this.formatTime()}</Text>
      </View>
    );
  }
}

const defaultStyles = {
  container: {
    position: 'absolute',
    backgroundColor: '#000',
    top: 80,
    left: 20,
    padding: 5,
    borderRadius: 5,
    width: 200,
  },
  timer: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

export default Timer;
