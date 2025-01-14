import clsx from 'clsx';
import { getFarewellText } from '../utils'
import { languages } from '../languages';

export default function Status({ isGameWon, isGameLost, isGameOver, lastGuessedLetter, isLastGuessIncorrect, numGuessesLeft, wrongGuessCount, currentWord, guessedLetters }) {
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
    <>
      <section aria-live='polite' role='status' className={gameStatusClass}>
        {renderStatusElement}
      </section>
      {/* Combined visually-hidden aria-live region for status updates */}
      <section className='sr-only' aria-live='polite' role='status'>
        <p>
          {currentWord.includes(lastGuessedLetter) ? `Correct! The letter ${lastGuessedLetter} is in the word.` : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          You have {numGuessesLeft} attemps left
        </p>
        <p>Current word: {currentWord.split('').map(letter => guessedLetters.includes(letter) ? letter + '.' : 'blank.').join(' ')}</p>
      </section>
    </>
  )
}