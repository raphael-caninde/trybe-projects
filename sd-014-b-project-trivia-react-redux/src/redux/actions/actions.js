export const ACTION_LOGIN = 'ACTION_LOGIN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const GET_NAME_EMAIL = 'GET_NAME_EMAIL';
export const ADD_SCORE = 'ADD_SCORE';
export const RESET_SCORE = 'RESET_SCORE';

export const triviaGameAction = (json) => ({
  type: ACTION_LOGIN,
  json,
});

export const fetchLogin = (token) => (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
  .then((response) => response.json()
    .then((json) => dispatch(triviaGameAction(json))));

export const saveTokenAction = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export const getNameEmail = (name, email) => ({
  type: GET_NAME_EMAIL,
  name,
  email,
});

export const addScoreAction = (score) => ({
  type: ADD_SCORE,
  score,
});

export const resetScore = (score) => ({
  type: RESET_SCORE,
  score,
});
