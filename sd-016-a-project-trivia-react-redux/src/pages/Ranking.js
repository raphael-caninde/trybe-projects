import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title"> Ranking </h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            className="bg-transparent hover:bg-blue-500 text-blue-700
          font-semiboldhover: text-white py-2 px-4  border border-blue-500
          hover: border-transparent rounded"
          >
            Reset Game
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
