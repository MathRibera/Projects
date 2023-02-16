import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './css/Ranking.module.css';

class Ranking extends Component {
  state = {
    loading: true,
  };

  async componentDidMount() {
    const getUsersLS = await JSON.parse(localStorage.getItem('Ranking'));
    console.log(getUsersLS);
    const ordered = getUsersLS.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.name.localeCompare(b.name);
    });
    console.log(ordered);
    this.setState({ loading: false, ordered });
  }

  render() {
    const { history } = this.props;
    const { loading, ordered } = this.state;
    console.log(ordered);
    if (loading) return <h1>Carregando...</h1>;
    return (
      <div
        className={ styles.backgrounds }
      >
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <div className={ styles.ordem }>
          {ordered.map((e, index) => (
            <div key={ index } className={ styles.classificacao }>
              <h4>
                {`${index + 1}º lugar`}
              </h4>
              <h2 data-testid={ `player-name-${index}` }>{e.name}</h2>
              <h3 data-testid={ `player-score-${index}` }>{e.score}</h3>
            </div>
          ))}
        </div>
        <button
          onClick={ () => history.push('/') }
          data-testid="btn-go-home"
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
