import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.getRanking = this.getRanking.bind(this);
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking.length);
    if (ranking.length > 0) {
      const scores = ranking.map((player) => player.score);
      const orderedScores = scores.sort((a, b) => b - a);
      const orderedPlayers = [];
      return orderedScores.map((score, index) => {
        const filteredPlayer = ranking.filter((player) => score === player.score);
        orderedPlayers.push(filteredPlayer[0]);
        localStorage.setItem('ranking', JSON.stringify(orderedPlayers));
        return (
          <li key={ index }>
            <img
              src={ filteredPlayer[0].picture }
              alt={ filteredPlayer[0].name }
            />
            <p data-testid={ `player-name-${index}` }>{ filteredPlayer[0].name }</p>
            <p data-testid={ `player-score-${index}` }>{ filteredPlayer[0].score }</p>
          </li>);
      });
    }
    return (
      <li>
        <img
          src={ ranking[0].picture }
          alt={ ranking[0].name }
        />
        <p data-testid="player-name-0">{ ranking[0].name }</p>
        <p data-testid="player-score-0">{ ranking[0].score }</p>
      </li>);
  }

  render() {
    return (
      <div data-testid="ranking-title">
        <h2>Ranking</h2>
        { this.getRanking() }
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Tela inicial</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.name,
  email: state.login.email,
  score: state.game.score,
});

export default connect(mapStateToProps)(Ranking);
