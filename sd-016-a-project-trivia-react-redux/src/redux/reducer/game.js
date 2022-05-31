import { SET_TIME, SET_RANDOM_ANSWER } from '../actions';

const INITIAL_STATE = {
  time: 0,
  answer: [],
};

const getTime = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIME:
    return {
      ...state,
      time: action.payload,
    };
  case SET_RANDOM_ANSWER:
    return {
      ...state,
      answer: action.payload,
    };
  default:
    return state;
  }
};

export default getTime;
