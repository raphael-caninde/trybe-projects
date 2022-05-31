import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

export default class Feedback extends React.Component {
  render() {
    const { history } = this.props;
    const getLocalStorage = (localStorage.getItem('state') !== null)
      ? JSON.parse(localStorage.getItem('state'))
      : { player: { assertions: '', score: '' } };
    // console.log(getLocalStorage);
    const { assertions, score } = getLocalStorage.player;
    const ok = 3;
    const feedbackMessage = (assertions >= ok) ? 'Well Done!' : 'Could be better...';
    return (
      <>
        <Header />
        <div><h1 data-testid="feedback-text">{ feedbackMessage }</h1></div>
        <div>
          Respostas corretas:
          <span data-testid="feedback-total-question">{ assertions }</span>
        </div>
        <div>
          Total:
          <span data-testid="feedback-total-score">{score}</span>
        </div>

        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
          className="bg-transparent hover:bg-blue-500 text-blue-700
          font-semiboldhover: text-white py-2 px-4  border border-blue-500
          hover: border-transparent rounded"
        >
          Jogar Novamente
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
          className="bg-transparent hover:bg-blue-500 text-blue-700
          font-semiboldhover: text-white py-2 px-4  border border-blue-500
          hover: border-transparent rounded"
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
