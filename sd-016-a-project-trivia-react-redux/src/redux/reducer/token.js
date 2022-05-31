import { SET_TOKEN } from '../actions/index';

const initialState = '';

function token(state = initialState, action) {
  switch (action.type) {
  case SET_TOKEN:
    return action.payload;
  default:
    return state;
  }
}

export default token;
