import { GET_NAME, GET_SCORE, GET_ASSERTIONS, GET_IMAGE, INITIAL_SCORE } from '../action';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case INITIAL_SCORE:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  case GET_NAME:
    return {
      ...state,
      ...payload,
    };
  case GET_SCORE:
    return {
      ...state,
      score: state.score + payload,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: payload,
    };
  case GET_IMAGE:
    return {
      ...state,
      linkUrl: payload,
    };
  default:
    return state;
  }
};

export default player;
