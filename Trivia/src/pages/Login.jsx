import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getName, initialScore } from '../redux/action';
import { getToken } from '../services/api';
import styles from './css/Login.module.css';
import logo from './css/images/trivia.png';

class Login extends Component {
  state = {
    nameInput: '',
    emailInput: '',
    isDisabled: true,
  };

  componentDidMount() {
    const getRanking = localStorage.getItem('Ranking');
    if (!getRanking) localStorage.setItem('Ranking', '[]');
  }

  loginValidation = () => {
    const { nameInput, emailInput } = this.state;
    this.setState({
      isDisabled: !(nameInput && emailInput),
    });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.loginValidation);
  };

  // handleClickPlay = () => {
  //   const { nameInput, emailInput } = this.state;
  //   const { history, dispatch } = this.props;
  // };

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/config');
  };

  submitData = async () => {
    const { history, dispatch } = this.props;
    const { nameInput, emailInput } = this.state;
    const data = await getToken();
    dispatch(getName({ name: nameInput, gravatarEmail: emailInput }));
    if (data.response_code === 0) {
      history.push('/game');
      dispatch(initialScore());
    }
  };

  render() {
    const { nameInput, emailInput, isDisabled } = this.state;
    return (
      <div className={ styles.background }>
        <img src={ logo } className={ styles.trivia } alt="logo" />
        <div className={ styles.container }>
          <div className={ styles.inputs }>
            <label htmlFor="nameInput">
              <input
                type="text"
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                name="nameInput"
                onChange={ this.handleChange }
                id="nameInput"
                value={ nameInput }
              />
            </label>
            <label htmlFor="emailInput">
              <input
                type="email"
                data-testid="input-gravatar-email"
                placeholder="Digite seu email"
                name="emailInput"
                onChange={ this.handleChange }
                id="emailInput"
                value={ emailInput }
              />
            </label>

          </div>
          <div className={ styles.buttons }>
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isDisabled }
              onClick={ this.submitData }
            >
              Play
            </button>

            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleClickSettings }
            >
              Settings
            </button>
          </div>

        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
