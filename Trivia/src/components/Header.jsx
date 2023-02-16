import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getUrl } from '../redux/action';
import styles from './css/Header.module.css';

class Header extends Component {
  state = {
    url: '',
  };

  async componentDidMount() {
    const { gravatarEmail, dispatch } = this.props;
    const hash = md5(gravatarEmail).toString();
    const getApi = (`https://www.gravatar.com/avatar/${hash}`);
    this.setState({
      url: getApi,
    }, () => dispatch(getUrl(getApi)));
  }

  render() {
    const { name, player } = this.props;
    const { url } = this.state;

    const { score } = player;

    return (
      <div className={ styles.cabecalho }>
        <img data-testid="header-profile-picture" alt="img-profile" src={ url } />
        <div className={ styles.nomePontos }>
          <h3 data-testid="header-player-name">
            {`Nome: ${name}`}
          </h3>
          <h3 data-testid="header-score">
            {`Score: ${score}`}
          </h3>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
  ...state,
});

export default connect(mapStateToProps)(Header);
