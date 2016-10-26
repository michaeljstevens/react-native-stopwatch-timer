import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';


class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      started: false,
      elapsed: null,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentDidMount() {
    if(this.props.started) {
      this.start();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.started && !this.state.started) {
      this.start();
    } else if(!newProps.started) {
      this.stop();
    }
  }

  start() {
    this.setState({startTime: new Date(), started: true});
    this.interval = setInterval(() => {
      this.setState({
        elapsed: new Date() - this.state.startTime
      });
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.setState({started: false, elapsed: null});
  }

  formatTime() {
    let seconds = Math.round(this.state.elapsed / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);
    let formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
    return formatted;
  }


  render() {
    console.log("stopwatch");
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
    width: 150,
  },
  timer: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

export default StopWatch;
