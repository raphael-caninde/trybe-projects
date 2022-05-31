import { ADD_SCORE, RESET_SCORE } from '../actions/actions';

const INITIAL_STATE = {
  score: 0,
};

export const reducerScore = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: action.score,
    };

  default:
    return state;
  }
};

export default reducerScore;
