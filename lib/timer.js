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

  // componentWillReceiveProps(newProps) {
  //   debugger
  //   if(newProps.totalDuration) {
  //     this.setState({totalDuration: newProps.totalDuration,
  //       remainingTime: newProps.totalDuration});
  //     this.reset();
  //   }
  //
  //   if(newProps.start) {
  //     this.start();
  //   }
  //
  //   if(newProps.stop) {
  //     this.stop();
  //   }
  //
  //   if(newProps.reset) {
  //     this.reset();
  //   }
  // }

  start() {
    this.interval = setInterval(() => {
      this.setState({remainingTime: this.state.remainingTime - 1});
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset() {
    this.stop();
    this.setState({remainingTime: this.state.totalDuration});
  }



  render() {
    return(
      <View>
        <Text>{this.state.remainingTime}</Text>
      </View>
    );
  }
}

export default Timer;
