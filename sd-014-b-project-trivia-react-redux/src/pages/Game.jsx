import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { addScoreAction } from '../redux/actions/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      idx: 0,
      toggle: false,
      disabled: false,
      time: 0,
      respostas: [],
      nextQuestion: true,
    };

    this.renderCardQuestion = this.renderCardQuestion.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showResponseAfterTime = this.showResponseAfterTime.bind(this);
    this.addTime = this.addTime.bind(this);
    this.calculatorPoints = this.calculatorPoints.bind(this);
    this.handleLocalStorage = this.handleLocalStorage.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const { name, email, score } = this.props;
    const state = {
      player: {
        name,
        assertions: 0,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
    if (!localStorage.getItem('ranking')) {
      const ranking = [];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  handleNextQuestion() {
    const { name, email, score } = this.props;
    const MAX_ARRAY = 4;
    const { idx } = this.state;
    const { history } = this.props;

    if (idx === MAX_ARRAY) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const rankingPlayer = {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
      };
      const newRanking = [...ranking, rankingPlayer];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      return history.push('/feedback');
    }
    this.setState({ nextQuestion: false });
    this.setState({
      idx: idx + 1,
      stopTimer: false,
      toggle: false,
      disabled: false,
    }, () => this.setState({ nextQuestion: true }));
  }

  addTime(time) {
    this.setState({
      time,
    });
  }

  handleClick({ target }) {
    this.setState({
      toggle: true,
      stopTimer: true,
    }, () => this.calculatorPoints(target));
  }

  calculatorPoints(target) {
    const { time, idx } = this.state;
    const { trivia, addPoints } = this.props;
    const TEN = 10;
    const hard = 3;
    const result = () => {
      switch (trivia[idx].difficulty) {
      case 'hard':
        return TEN + (time * hard);
      case 'medium':
        return TEN + (time * 2);
      case 'easy':
        return TEN + (time * 1);
      default:
        break;
      }
    };
    console.log('aqui');
    if (target.className === 'correct') {
      addPoints(result());
      this.handleLocalStorage(result(), target);
    } else {
      addPoints(0);
      this.handleLocalStorage(0, target);
    }
  }

  handleLocalStorage(result, target) {
    const { name, email, score } = this.props;
    console.log('handle');
    if (!localStorage.getItem('state')) {
      console.log('criando local');
      const state = {
        player: {
          name,
          assertions: 0,
          score,
          gravatarEmail: email,
        },
      };

      localStorage.setItem('state', JSON.stringify(state));
    }
    if (target.className === 'correct') {
      const state = JSON.parse(localStorage.getItem('state'));

      const newState = {
        player: {
          name: state.player.name,
          assertions: state.player.assertions + 1,
          score: state.player.score + result,
          gravatarEmail: email,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
    this.setState({ disabled: true });
  }

  showResponseAfterTime() {
    this.setState({
      toggle: true,
      stopTimer: true,
      disabled: true,
    });
  }

  renderCardQuestion() {
    const { idx, toggle, disabled } = this.state;
    const { trivia } = this.props;
    if (trivia !== []) {
      const correctAnswer = ([
        <button
          onClick={ this.handleClick }
          className={ toggle && 'correct' }
          type="button"
          data-testid="correct-answer"
          key=""
          disabled={ disabled }
        >
          { trivia[idx].correct_answer }
        </button>]);
      const incorrctAnswers = trivia[idx].incorrect_answers.map((answer, index) => (
        <button
          onClick={ this.handleClick }
          className={ toggle && 'incorrect' }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          key={ index }
          disabled={ disabled }
        >
          { answer }
        </button>
      ));

      const arrayQuestions = [...correctAnswer, ...incorrctAnswers];
      const HALF = 0.5;
      return (
        <>
          <p data-testid="question-category">{ trivia[idx].category }</p>
          <h3 data-testid="question-text">{ trivia[idx].question }</h3>
          {arrayQuestions.sort(() => Math.round(Math.random()) - HALF)}
        </>
      );
    }
  }

  render() {
    const { stopTimer, respostas, nextQuestion } = this.state;
    const { request } = this.props;
    return (
      <div>
        <Header />
        { nextQuestion && <Timer
          addTime={ this.addTime }
          stopTimer={ stopTimer }
          showResponseAfterTime={ this.showResponseAfterTime }
        />}
        game

        {request && this.renderCardQuestion()}
        {request && respostas }
        { stopTimer
        && (
          <button
            type="button"
            onClick={ this.handleNextQuestion }
            data-testid="btn-next"
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

Game.propTypes = {
  request: PropTypes.bool.isRequired,
  trivia: PropTypes.arrayOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  addPoints: PropTypes.func.isRequired,
  history: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  trivia: state.login.triviaQuest.results,
  request: state.login.request,
  name: state.login.name,
  email: state.login.email,
  score: state.game.score,
});

const mapDispatchToProps = (dispatch) => ({
  addPoints: (score) => dispatch(addScoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
