import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { dataMock } from './helpers/mockData'
import { act } from 'react-dom/test-utils';

describe('Testa página de Login', () => {
  jest.setTimeout(90000)
  it('Verifica se os inputs de texto e botão estão na tela', async () => {
    const {history} = renderWithRouterAndRedux(<App />)

    expect(screen.getByTestId('input-player-name')) //input nome da pagina /
    expect(screen.getByTestId('input-gravatar-email')) //input email da  pagina /
    expect(screen.getByTestId('btn-play')) // botao da play pagina /
    expect(screen.getByTestId('btn-settings')) // botao da settings pagina /

    userEvent.type(screen.getByTestId('input-player-name'), 'teste')
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste@test.com')

    await waitFor(() => expect(screen.getByTestId('btn-play')).not.toBeDisabled())
    userEvent.click(screen.getByTestId('btn-play'))
    // ----------- fim da pagina login --------------------//

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    expect(screen.getByText(/30 segundos restantes/))

    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 32000})
    expect(screen.getByText(/0 segundos restantes/))
    userEvent.click(screen.getByTestId('btn-next'))


    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('header-profile-picture')), {timeout: 2000})
    expect(screen.getByTestId('feedback-total-score'))
    expect(screen.getByTestId('header-score'))
    expect(screen.getByTestId('feedback-total-question'))
    expect(screen.getByTestId('btn-play-again'))
    expect(screen.getByTestId('btn-ranking'))

    userEvent.click(screen.getByTestId('btn-play-again'))
    // ----------------- fim pagina game -------------------
    await waitFor(() => expect(screen.getByTestId('input-player-name')), { timeout: 3000})

    expect(screen.getByTestId('input-player-name')) //input nome da pagina /
    expect(screen.getByTestId('input-gravatar-email')) //input email da  pagina /
    expect(screen.getByTestId('btn-play')) // botao da play pagina /
    expect(screen.getByTestId('btn-settings')) // botao da settings pagina /

    userEvent.type(screen.getByTestId('input-player-name'), 'teste1')
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste1@test.com')
    await waitFor(() => expect(screen.getByTestId('btn-play')).not.toBeDisabled(), {timeout: 2000})
    userEvent.click(screen.getByTestId('btn-play'))
    // -------------- fim da pagina de login -----------------

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))

    await waitFor(() => expect(screen.getByTestId('header-profile-picture')), {timeout: 2000})
    expect(screen.getByTestId('feedback-total-score'))
    expect(screen.getByTestId('header-score'))
    expect(screen.getByTestId('feedback-total-question'))
    expect(screen.getByText(/Well done/i))

    expect(screen.getByTestId('btn-play-again'))
    expect(screen.getByTestId('btn-ranking'))

    userEvent.click(screen.getByTestId('btn-ranking'))
    // ------------------ fim da pagina de game ---------------------
    await waitFor(() => expect(screen.getByTestId('ranking-title')), {timeout: 2000})
    expect(screen.getByTestId('player-name-0'))
    expect(screen.getByTestId('player-score-0'))
    expect(screen.getByTestId('player-name-1'))
    expect(screen.getByTestId('player-score-1'))

    expect(screen.getByTestId('btn-go-home'))
    userEvent.click(screen.getByTestId('btn-go-home'));
    // ------------------- fim da pagina de ranking ------------------
    // console.log(history.location.pathname)
    expect(screen.getByTestId('input-player-name')) //input nome da pagina /
    expect(screen.getByTestId('input-gravatar-email')) //input email da  pagina /
    expect(screen.getByTestId('btn-play')) // botao da play pagina /
    expect(screen.getByTestId('btn-settings')) // botao da settings pagina /

    userEvent.type(screen.getByTestId('input-player-name'), 'teste3')
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'teste3@test.com')

    await waitFor(() => expect(screen.getByTestId('btn-play')).not.toBeDisabled())
    userEvent.click(screen.getByTestId('btn-play'))
    // -------------- fim da pagina de login -----------------
    await waitFor(() => expect(screen.getByTestId('correct-answer')), {timeout: 3000})
    userEvent.click(screen.getByTestId('correct-answer'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))
    await waitFor(() => screen.getByTestId('btn-next'), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-next'))
    userEvent.click(screen.getByTestId('btn-play-again'))

    await waitFor(() =>expect(screen.getByTestId('btn-settings')), {timeout: 3000})
    userEvent.click(screen.getByTestId('btn-settings'))
    await waitFor(() =>expect(screen.getByText(/config/i)), {timeout: 2000})
    expect(history.location.pathname).toBe('/config')

    act(() =>{
      history.push('/')
    })
  })
});