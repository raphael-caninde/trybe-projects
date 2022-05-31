export const SET_TOKEN = 'SET_TOKEN';

export const setToken = (payload) => ({
  type: SET_TOKEN, payload,
});

export const SET_NAME = 'SET_NAME';

export const setName = (payload) => ({
  type: SET_NAME, payload,
});

export const SET_EMAIL = 'SET_EMAIL';

export const setEmail = (payload) => ({
  type: SET_EMAIL, payload,
});

// export const SET_REQUEST_TOKEN = 'SET_REQUEST_TOKEN';

// export const setRequestToken = (payload) => ({
// type: SET_REQUEST_TOKEN, payload,
// });

export const SET_QUESTIONS = 'SET_QUESTIONS';

export const setQuestions = (payload) => ({
  type: SET_QUESTIONS, payload,
});

export const SET_TIME = 'SET_TIME';

export const setTime = (payload) => ({
  type: SET_TIME, payload,
});

export const SET_SCORE = 'SET_SCORE';

export const setScore = (payload) => ({
  type: SET_SCORE, payload,
});

export const RESET_SCORE = 'RESET_SCORE';

export const resetScore = (payload) => ({
  type: RESET_SCORE,
  payload,
});

export const SET_RANDOM_ANSWER = 'SET_RANDOM_ANSWER';

export const setRandomAnswer = (payload) => ({
  type: SET_RANDOM_ANSWER,
  payload,
});
