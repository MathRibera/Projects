const GET_QUESTION = 'GET_QUESTION';
export const GET_NAME = 'GET_NAME';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const GET_IMAGE = 'GET_IMAGE';
export const INITIAL_SCORE = 'INITIAL_SCORE';

export const initialScore = () => ({
  type: INITIAL_SCORE,
});
const getQuestion = (questions) => ({
  type: GET_QUESTION,
  questions,
});

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const getAssertions = (payload) => ({
  type: GET_ASSERTIONS,
  payload,
});

export const getUrl = (payload) => ({
  type: GET_IMAGE,
  payload,
});
// const qntQuestion = 5;

// export const fetchApiQuestion = (
//   qntQuestions = qntQuestion,
//   token,
// ) => async (dispatch) => {
//   const data = await (await fetch(`https://opentdb.com/api.php?amount=${qntQuestions}&token=${token}`)).json();
//   dispatch(getQuestion(data));
// };

export default getQuestion;
