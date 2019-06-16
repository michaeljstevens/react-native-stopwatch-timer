import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';


class StopWatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      stopTime: null,
      pausedTime: null,
      started: false,
      elapsed: null,
    };
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
    this.formatTime = this.formatTime.bind(this);
    const width = props.msecs ? 220 : 150;
    this.defaultStyles = {
      container: {
        backgroundColor: '#000',
        padding: 5,
        borderRadius: 5,
        width: width,
      },
      text: {
        fontSize: 30,
        color: '#FFF',
        marginLeft: 7,
      }
    };
  }

  componentDidMount() {
    if(this.props.start) {
      this.start();
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.start) {
      this.start();
    } else {
      this.stop();
    }
    if(newProps.reset) {
      this.reset();
    }
  }

  componentWillUnmount() {
     clearInterval(this.interval);
  }

  start() {
    if (this.props.laps && this.state.elapsed) {
      let lap = new Date() - this.state.stopTime;
      this.setState({
        stopTime: null,
        pausedTime: this.state.pausedTime + lap
      })
    }
    
    this.setState({startTime: this.state.elapsed ? new Date() - this.state.elapsed :
      new Date(), started: true});
      
    this.interval = this.interval ? this.interval : setInterval(() => {
        this.setState({elapsed: new Date() - this.state.startTime });
    }, 1);
  }

  stop() {
    if(this.interval) {
      if (this.props.laps) {
        this.setState({stopTime: new Date()})
      }

      clearInterval(this.interval);
      this.interval = null;
    }
    this.setState({started: false});
  }

  reset() {
    this.setState({elapsed: null, startTime: null, stopTime: null, pausedTime: null});
  }

  formatTime() {
    let now = this.state.elapsed;
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

    if (typeof this.props.getTime === "function")
      this.props.getTime(formatted);

    return formatted;
  }


  render() {

    const styles = this.props.options ? this.props.options : this.defaultStyles;

    return(
      <View ref="stopwatch" style={styles.container}>
        <Text style={styles.text}>{this.formatTime()}</Text>
      </View>
    );
  }
}

export default StopWatch;
