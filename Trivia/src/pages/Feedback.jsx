import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './css/Feedback.module.css';

class Feedback extends Component {
  render() {
    const { player, history } = this.props;
    const { linkUrl, name, score, assertions } = player;
    const frase1 = <h3>Could be better...</h3>;
    const frase2 = <h3>Well Done!</h3>;
    const three = 3;
    return (
      <div className={ styles.backgrounds }>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ linkUrl }
            alt="a"
          />
          <h3
            data-testid="header-player-name"
          >
            {name}
          </h3>
          <div>
            <p
              data-testid="header-score"
            >
              {`${score}`}
            </p>
            <p data-testid="feedback-total-question">
              {assertions}
            </p>
          </div>
          <div data-testid="feedback-text">
            { assertions < three ? frase1 : frase2 }
          </div>
        </div>
        <div className={ styles.playagain }>
          <button
            data-testid="btn-play-again"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
        </div>
        <div className={ styles.ranking }>
          <button
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Feedback);
