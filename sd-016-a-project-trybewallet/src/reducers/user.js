import { SUBMIT_EMAIL } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_EMAIL:
    return {
      email: action.payloadEmail,
    };
  default:
    return state;
  }
};

export default formReducer;
