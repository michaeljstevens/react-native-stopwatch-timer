import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { formatTimeString } from './utils';

class Timer extends Component {
  static propTypes = {
    start: PropTypes.bool,
    reset: PropTypes.bool,
    msecs: PropTypes.bool,
    options: PropTypes.object,
    handleFinish: PropTypes.func,
    totalDuration: PropTypes.number,
    getTime: PropTypes.func,
    getMsecs: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      remainingTime: props.totalDuration,
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
      this.reset(newProps.totalDuration);
    }
  }

  start() {
    const handleFinish = this.props.handleFinish ? this.props.handleFinish : () => alert("Timer Finished");
    const endTime = new Date().getTime() + this.state.remainingTime;
    this.interval = setInterval(() => {
      const remaining = endTime - new Date();
      if(remaining <= 1000) {
        this.setState({remainingTime: 0});
        this.stop();
        handleFinish();
        return;
      }
      this.setState({remainingTime: remaining});
    }, 1);
  }

  stop() {
    clearInterval(this.interval);
  }

  reset(newDuration) {
    this.setState({
      remainingTime: 
        this.props.totalDuration !== newDuration ? 
          newDuration : 
          this.props.totalDuration
      });
  }

  formatTime() {
    const { getTime, getMsecs, msecs } = this.props;
    const now = this.state.remainingTime;
    const formatted = formatTimeString(now, msecs);
    if (typeof getTime === "function") {
      getTime(formatted);
    }
    if (typeof getMsecs === "function") {
      getMsecs(now)
    }
    return formatted;
  }

  render() {

    const styles = this.props.options ? this.props.options : this.defaultStyles;

    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.formatTime()}</Text>
      </View>
    );
  }
}

export default Timer;
