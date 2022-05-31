import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../style/main.css';

class Title extends Component {
  render() {
    const { headline } = this.props;

    return (
      <div className="title">
        <h2>{ headline }</h2>
      </div>
    );
  }
}

Title.propTypes = {
  headline: PropTypes.string.isRequired,
};

export default Title;
