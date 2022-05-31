import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      segundos: 30,
      bool: false,
    };

    this.boolState = this.boolState.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({ segundos: prevState.segundos - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate(prevProps, prevState) {
    const { stopTimer, showResponseAfterTime, addTime } = this.props;
    const zeraTime = 1;
    if (prevState.segundos === zeraTime) {
      clearInterval(this.time);
      showResponseAfterTime(prevState);
    }
    if (stopTimer) {
      clearInterval(this.time);
      if (prevState.bool === false) {
        addTime(prevState.segundos);
        this.boolState();
      }
    }
  }

  boolState() {
    this.setState({
      bool: true,
    });
  }

  render() {
    const { segundos } = this.state;
    return (
      <p>{segundos}</p>
    );
  }
}

Timer.propTypes = {
  stopTimer: PropTypes.bool.isRequired,
  showResponseAfterTime: PropTypes.func.isRequired,
  addTime: PropTypes.func.isRequired,
};

export default Timer;
