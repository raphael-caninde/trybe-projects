import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      state: {},
      loading: false,
    };

    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handlePageRanking = this.handlePageRanking.bind(this);
  }

  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage() {
    const state = JSON.parse(localStorage.getItem('state'));
    this.setState({
      state,
      loading: true,
    });
  }

  handlePage() {
    const { history } = this.props;
    history.push('/');
  }

  handlePageRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { state, loading } = this.state;
    return (
      <>
        <Header />
        <main>
          <div data-testid="feedback-total-score">{ loading && state.player.score }</div>
          <div data-testid="feedback-total-question">
            { loading && state.player.assertions }
          </div>
          {loading && state.player.assertions > 2
          && <h1 data-testid="feedback-text">Mandou bem!</h1>}
          {loading && state.player.assertions <= 2
          && <h1 data-testid="feedback-text">Podia ser melhor...</h1>}

          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePage }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handlePageRanking }
          >
            Ver Ranking
          </button>
        </main>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Feedback;
