import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTime } from '../redux/actions';

export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 30,
      bool: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { stopTime, allTrues, getTime } = this.props;
    if (stopTime) {
      clearInterval(this.time);
      if (prevState.bool === false) {
        getTime(prevState.seconds);
        this.bool();
      }
    }
    if (prevState.seconds === 1) {
      clearInterval(this.time);
      allTrues(prevState);
    }
  }

  bool = () => {
    this.setState({ bool: true });
  }

  startTimer = () => {
    const ONE_SECOND = 1000;
    this.time = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div>
        { seconds }
      </div>
    );
  }
}

Timer.propTypes = {
  stopTime: PropTypes.bool,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  getTime: (time) => dispatch(setTime(time)),
});

export default connect(null, mapDispatchToProps)(Timer);
