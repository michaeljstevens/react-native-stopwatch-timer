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
    }, 1);
  }

  stop() {
    clearInterval(this.interval);
    this.setState({started: false, elapsed: null});
  }

  formatTime() {
    let now = this.state.elapsed
    let msecs = now % 1000;
    let seconds = Math.floor(now / 1000);
    let minutes = Math.floor(now / 60000);
    let hours = Math.floor(now / 3600000);
    seconds = seconds - (minutes * 60);
    minutes = minutes - (hours * 60);
    const formatted = `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${seconds < 10 ? 0 : ""}${seconds}:${msecs}`;
    return formatted;
  }


  render() {
    console.log("stopwatch");

    let customContainer = false;
    let customText = false;

    if(this.props.options) {
      if(this.props.options.container) customContainer = true;
      if(this.props.options.text) customText = true;
    }

    return(
      <View style={customContainer ? customContainer : defaultStyles.container}>
        <Text style={customText ? customText : defaultStyles.text}>{this.formatTime()}</Text>
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
    width: 300,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

export default StopWatch;
