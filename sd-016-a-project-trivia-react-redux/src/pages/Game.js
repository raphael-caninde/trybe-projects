import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import '../css/style.css';

import Header from '../components/Header';
import { setToken, setScore, setRandomAnswer } from '../redux/actions/index';
import ButtonNext from '../components/ButtonNext';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stopTime: false,
      toggle: false,
      disabled: false,
      idx: 0,
      nextQuestion: true,
    };
  }

  componentDidMount() {
    const { name, gravatarEmail, score } = this.props;
    const state = {
      player: {
        name,
        assertions: 0,
        score,
        gravatarEmail,
      },
    };

    localStorage.setItem('state', JSON.stringify(state));
    if (!localStorage.getItem('ranking')) {
      const ranking = [];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  handleClick = ({ target }) => {
    this.setState({
      toggle: true,
      stopTime: true,
    }, () => this.calculatorPoints(target));
  }

  allTrues = () => {
    this.setState({
      toggle: true,
      stopTime: true,
      disabled: true,
    });
  }

  calculatorPoints = (target) => {
    const { idx } = this.state;
    const { time, infoQuestions: { results }, addPoint } = this.props;
    console.log(results);
    console.log(results[idx].difficulty, 'sou o results');
    const TEN = 10;
    const HARD = 3;
    const result = () => {
      switch (results[idx].difficulty) {
      case 'hard':
        return TEN + (time * HARD);
      case 'medium':
        return TEN + (time * 2);
      case 'easy':
        return TEN + (time * 1);
      default:
        break;
      }
    };

    if (target.className === 'correct') {
      addPoint(result());
      this.handleLocalStorage(result(), target);
    } else {
      addPoint(0);
      this.handleLocalStorage(0, target);
    }
  }

  handleLocalStorage = (result, target) => {
    const { score, name, gravatarEmail } = this.props;
    if (!localStorage.getItem('state')) {
      const state = {
        player: {
          name,
          gravatarEmail,
          assertions: 0,
          score,
        },
      };
      localStorage.setItem('state', JSON.stringify(state));
    }

    if (target.className === 'correct') {
      const state = JSON.parse(localStorage.getItem('state'));
      const newState = {
        player: {
          name,
          gravatarEmail,
          assertions: state.player.assertions + 1,
          score: state.player.score + result,
        },
      };
      localStorage.setItem('state', JSON.stringify(newState));
    }
    this.setState({ disabled: true });
  }

  handleNextQuestion = () => {
    const MAX_ARRAY = 4;
    const { idx } = this.state;
    const { name, score, gravatarEmail, history } = this.props;

    if (idx === MAX_ARRAY) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const rankingPlayer = {
        name,
        score,
        picture: `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`,
      };
      const newRanking = [...ranking, rankingPlayer];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      return history.push('/feedback');
    }
    this.setState({ nextQuestion: false });
    this.setState({
      idx: idx + 1,
      stopTime: false,
      toggle: false,
      disabled: false,
    }, () => this.setState({ nextQuestion: true }));
  }

  renderBottonsQuestion() {
    const { idx, toggle, disabled } = this.state;
    const { infoQuestions: { results } } = this.props;
    if (results !== []) {
      const correctAnswer = ([
        <button
          onClick={ this.handleClick }
          className={ toggle && 'correct' }
          type="button"
          data-testid="correct-answer"
          key=""
          disabled={ disabled }
        >
          { results[idx].correct_answer }
        </button>]);
      const incorrctAnswers = results[idx].incorrect_answers.map((answer, i) => (
        <button
          onClick={ this.handleClick }
          className={ toggle && 'incorrect' }
          type="button"
          data-testid={ `wrong-answer-${i}` }
          key={ i }
          disabled={ disabled }
        >
          { answer }
        </button>
      ));

      const arrayQuestions = [...correctAnswer, ...incorrctAnswers];
      const HALF = 0.5;
      return (
        <div data-testid="answer-options">
          <p data-testid="question-category">{ results[idx].category }</p>
          <h3 data-testid="question-text">{ results[idx].question }</h3>
          {arrayQuestions.sort(() => Math.round(Math.random()) - HALF)}
        </div>
      );
    }
  }

  render() {
    const { stopTime, nextQuestion } = this.state;
    return (
      <div>
        <Header />
        { nextQuestion && <Timer
          stopTime={ stopTime }
          allTrues={ this.allTrues }
          getTime={ this.getTime }
        />}
        { this.renderBottonsQuestion() }
        { stopTime && <ButtonNext handleNextQuestion={ this.handleNextQuestion } /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  infoQuestions: state.player.questions,
  time: state.game.time,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  answer: state.game.answer,
  request: state.token.request,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSetToken: (token) => dispatch(setToken(token)),
  addPoint: (point) => dispatch(setScore(point)),
  dispatchSetRandomAnswer: (answer) => dispatch(setRandomAnswer(answer)),
});

Game.propTypes = {
  infoQuestions: PropTypes.objectOf(PropTypes.string),
  time: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  addPoint: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.oneOfType(PropTypes.string),
};

Game.defaultProps = {
  infoQuestions: '',
};

Game.defaultProps = {
  history: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
