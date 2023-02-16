import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getAssertions, getScore } from '../redux/action';
import './cssss.css';
import styles from './css/Game.module.css';

const initial = 'correct-answer';
class Game extends Component {
  state = {
    questions: [],
    indice: 0,
    answers: [],
    correctAnswer: '',
    enable: false,
    seconds: 30,
    disableButton: false,
    scores: 0,
    buttonNext: false,
    perguntaNumber: 0,
    assertions: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const data = await (
      await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    ).json();
    const three = 3;
    // FALTA TESTAR
    if (data.response_code === three) {
      localStorage.removeItem('token');
      history.push('/');
      return;
    }
    this.startTime();
    const { player } = this.props;
    const { score } = player;
    this.setState(
      { questions: data.results, scores: score },
      this.createAnswers,
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  // FALTA TESTAR
  startTime = () => {
    const timeNumber = 1000;
    this.intervalId = setInterval(() => {
      this.setState(({ seconds }) => {
        if (seconds === 0) {
          clearInterval(this.intervalId);
          this.setState({ disableButton: true, buttonNext: true });
          return {};
        }

        return {
          seconds: seconds - 1,
        };
      });
    }, timeNumber);
  };

  createAnswers = () => {
    const { questions, indice } = this.state;
    const correctAnswer = questions[indice].correct_answer;
    const incorrectAnswers = questions[indice].incorrect_answers;
    const allAnswers = [correctAnswer];
    allAnswers.push(...incorrectAnswers);
    const answers = [];
    const count = allAnswers.length;
    for (let index = 0; index < count; index += 1) {
      const random = Math.floor(Math.random() * allAnswers.length);
      answers.push(allAnswers[random]);
      allAnswers.splice(random, 1);
    }
    this.setState({ answers, correctAnswer });
  };

  // Clique no botao next
  changeIndiceState = () => {
    clearInterval(this.intervalId);
    this.setState(
      (prev) => ({ indice: prev.indice + 1,
        enable: false,
        seconds: 30,
        perguntaNumber: prev.perguntaNumber + 1 }),
      this.createAnswers,
    );
    this.startTime();
    const { perguntaNumber } = this.state;
    const { history, dispatch, player } = this.props;
    const number = 4;
    if (perguntaNumber === number) {
      const { assertions } = this.state;
      dispatch(getAssertions(assertions));
      const recoverRanking = JSON.parse(localStorage.getItem('Ranking'));
      localStorage.setItem('Ranking', JSON
        .stringify([...recoverRanking, player]));
      return history.push('/feedback');
    }
  };

  score = (target) => {
    const { seconds } = this.state;
    const difficultsPoints = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (target.dataset.testid === initial) {
      const initialNumber = 10;
      const valueScore = initialNumber + (difficultsPoints[target.value] * seconds);
      this.setState(
        (prev) => ({ scores: prev.scores + valueScore, assertions: prev.assertions + 1 }),
        () => {
          const { scores } = this.state;
          const { dispatch } = this.props;
          this.setState({ buttonNext: true });
          dispatch(getScore(scores));
        },
      );
    }
  };

  // clique no botao de respostas
  addID = () => {
    clearInterval(this.intervalId);
    this.setState({ enable: true });
  };

  render() {
    const { questions, indice, buttonNext } = this.state;
    const { answers, correctAnswer, enable, seconds, disableButton } = this.state;
    if (!questions[indice]?.question) return <h1>Carregando</h1>;
    return (
      <div className={ styles.backgrounds }>
        <div className={ styles.header }>
          <Header />
        </div>
        <div className={ styles.container }>
          <div className={ styles.category }>
            <h2 data-testid="question-category">{questions[indice].category}</h2>
            <h3 data-testid="question-text">{questions[indice].question}</h3>
          </div>
          <div className={ styles.questions }>
            <div
              className={ styles.buttons }
              data-testid="answer-options"
            >
              {answers.map((answer, index) => (
                <button
                  key={ index }
                  type="button"
                  disabled={ disableButton }
                  value={ questions[indice].difficulty }
                  className={
                    (
                      enable
                        && (correctAnswer === answer
                          ? `${initial}`
                          : 'wrong-answer')
                    ).toString()
                  }
                  onClick={ ({ target }) => {
                    this.addID();
                    this.score(target);
                    this.setState({ buttonNext: true });
                    this.setState({ disableButton: true });
                  } }
                  data-testid={
                    correctAnswer === answer
                      ? `${initial}`
                      : `wrong-answer-${index}`
                  }
                >
                  {answer}
                </button>
              ))}
              <br />
              <div
                className={ styles.segundos }
              >
                {`${seconds} segundos restantes`}

              </div>
              <br />
              {buttonNext && (
                <button
                  onClick={ () => {
                    this.changeIndiceState();
                    this.setState({ disableButton: false, buttonNext: false });
                  } }
                  data-testid="btn-next"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
