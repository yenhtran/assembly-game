import clsx from 'clsx';
import getFarewellText from '../utils'
import { languages } from '../languages';

export default function Status({ isGameWon, isGameLost, isGameOver, isLastGuessIncorrect, wrongGuessCount }) {
  const gameStatusClass = clsx('game-status', {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect
  })

  let renderStatusElement;
  if (!isGameOver && isLastGuessIncorrect) {
    renderStatusElement = <p className='farewell-message'>{getFarewellText(languages[wrongGuessCount-1].name)}</p>
  } else if (isGameWon) {
    renderStatusElement =
      <>
        <h2>You win!</h2>
        <p>Well done!🎉</p>
      </>
  } else if (isGameLost) {
    renderStatusElement =
      <>
        <h2>Game over!</h2>
        <p>You lose! Better start learning Assembly 😭</p>
      </>
  } else {
    renderStatusElement = null
  }

  return (
    <section className={gameStatusClass}>
      {renderStatusElement}
    </section>
  )
}