import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setToken,
  setName,
  setEmail,
  setQuestions,
  resetScore,
} from '../redux/actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabledBtn: true,
      email: '',
      username: '',
    };
  }

  checkInput= () => {
    const { email, username } = this.state;
    const validation = /\S+@\S+\.\S+/;
    const minCharacters = 2;
    if (validation.test(email) && minCharacters <= username.length) {
      this.setState({ disabledBtn: false });
    } else {
      this.setState({ disabledBtn: true });
    }
  }

  onHandleChange = (event) => {
    const { value, id } = event.target;
    this.setState({ [id]: value }, () => this.checkInput());
  }

  goToSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  onHandleClick = async () => {
    const {
      dispatchSetToken,
      dispatchSetName,
      dispatchSetEmail,
      dispatchSetQuestions,
      resetScoreAction,
    } = this.props;

    const {
      email,
      username,
    } = this.state;

    dispatchSetEmail(email);
    dispatchSetName(username);

    const token = await this.getToken();
    const questions = await this.getFetchQuestions(token);
    const checkToken = await this.checkTokenTimeOut(questions);

    if (checkToken) {
      localStorage.setItem('token', token);
      dispatchSetToken(token);
      dispatchSetQuestions(questions);
    } else {
      const newToken = await this.getToken();
      const newQuestion = await this.getFetchQuestions(newToken);
      localStorage.setItem('token', newToken);
      dispatchSetToken(newToken);
      dispatchSetQuestions(newQuestion);
      const startScore = 0;
      resetScoreAction(startScore);
      const { history } = this.props;
      history.push('/game');
    }
  }

  getToken = async () => {
    const urlTrivia = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(urlTrivia);
    const tokenResponse = await response.json();
    return tokenResponse.token;
  }

  getFetchQuestions = async (token) => {
    const urlTriviaQuestions = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(urlTriviaQuestions);
    const questionResponse = await response.json();
    return questionResponse;
  }

  checkTokenTimeOut = async (questions) => {
    const timeoutResponse = 3;
    const responseApi = questions.response_code;
    return !responseApi === timeoutResponse;
  }

  // getFetchQuestions = async (workingToken) => {
  //   console.log(this.state.currentToken);
  //   const { currentToken } = this.state;
  //   const urlTriviaQuestions = `https://opentdb.com/api.php?amount=5&token=${currentToken}`;
  //   const response = await fetch(urlTriviaQuestions);
  //   const questionResponse = await response.json();
  //
  //   this.checkTokenTimeOut(questionResponse, workingToken);
  //
  //   const { dispatchSetQuestions } = this.props;
  //   dispatchSetQuestions(questionResponse);
  // }
  //
  // checkTokenTimeOut = async (questions, workingToken) => {
  //   const { dispatchSetToken } = this.props;
  //   const timeoutResponse = 3;
  //   // const responseApi = questions.response_code;
  //   const responseApi = 3;
  //   if (responseApi === timeoutResponse) {
  //     const urlTrivia = 'https://opentdb.com/api_token.php?command=request';
  //     const response = await fetch(urlTrivia);
  //     const tokenResponse = await response.json();
  //     const { token } = tokenResponse;
  //
  //     localStorage.setItem('token', token);
  //     dispatchSetToken(token);
  //   } else {
  //     dispatchSetToken(workingToken);
  //   }
  // }

  render() {
    // const { email, username } = this.props;
    const {
      disabledBtn,
    } = this.state;

    return (
      <div className="flex max-w-xs">
        <form className="items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2
              px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              data-testid="input-gravatar-email"
              onChange={ this.onHandleChange }
            />
          </div>
          <div className="mb-4">
            <input
              className="shadow appearance-none border rounded w-full py-2
              px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Nome"
              data-testid="input-player-name"
              onChange={ this.onHandleChange }
            />
          </div>
          <button
            className={ disabledBtn
              ? `bg-red-500 hover:bg-red-400 text-white font-bold cursor-not-allowed
            py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded`
              : `bg-blue-500 hover:bg-blue-400 text-white font-bold
            py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded` }
            type="button"
            disabled={ disabledBtn }
            data-testid="btn-play"
            onClick={ this.onHandleClick }
          >
            Play
          </button>
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700
            font-semibold hover:text-white py-2 px-4 border border-blue-500
            hover:border-transparent rounded"
            type="button"
            data-testid="btn-settings"
            onClick={ this.goToSettings }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  // email: PropTypes.string.isRequired,
  // username: PropTypes.string.isRequired,
  history: PropTypes.oneOfType(PropTypes.string),
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  dispatchSetToken: PropTypes.func.isRequired,
  dispatchSetName: PropTypes.func.isRequired,
  dispatchSetEmail: PropTypes.func.isRequired,
  // dispatchSetRequestToken: PropTypes.func.isRequired,
  dispatchSetQuestions: PropTypes.func.isRequired,
  resetScoreAction: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: '',
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSetToken: (token) => dispatch(setToken(token)),
  dispatchSetName: (name) => dispatch(setName(name)),
  dispatchSetEmail: (email) => dispatch(setEmail(email)),
  // dispatchSetRequestToken: (request) => dispatch(setRequestToken(request)),
  dispatchSetQuestions: (question) => dispatch(setQuestions(question)),
  resetScoreAction: (score) => dispatch(resetScore(score)),
});

const mapStateToProps = (state) => ({
  infoQuestions: state.player.questions,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
