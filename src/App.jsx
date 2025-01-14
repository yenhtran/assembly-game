import { useState } from 'react'
import clsx from 'clsx'
import Header from './components/Header'
import Status from './components/Status'
import Languages from './components/Languages'
import { languages } from './languages'
import { getRandomWord } from './utils'

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const numGuessesLeft = languages.length - 1
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split('').every(char => guessedLetters.includes(char));
  const isGameLost = wrongGuessCount >= numGuessesLeft;
  const isGameOver = isGameWon || isGameLost
  const lastGuessedLetter = guessedLetters[guessedLetters.length-1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter)

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const wordElements = currentWord.split('').map((letter, index) => {
    return (
      <span
        key={index}
      >
        {guessedLetters.includes(letter) ? letter.toUpperCase() : ''}
      </span>
    )
  })

  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const className = clsx({
      correct: isCorrect,
      wrong: isWrong
    })

    return (
      <button
          disabled={isGameOver}
          aria-disabled={guessedLetters.includes(letter)}
          aria-label={`Letter ${letter}`}
          key={letter}
          className={className}
          onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    )
})

  function addGuessedLetter(letter) {
    setGuessedLetters(prev =>
      prev.includes(letter) ? prev : [...prev, letter]
    )
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([])
  }

  return (
      <main>
        <Header />
        <Status
          isGameWon={isGameWon}
          isGameLost={isGameLost}
          isGameOver={isGameOver}
          lastGuessedLetter={lastGuessedLetter}
          isLastGuessIncorrect={isLastGuessIncorrect}
          numGuessesLeft={numGuessesLeft}
          wrongGuessCount={wrongGuessCount}
          currentWord={currentWord}
          guessedLetters={guessedLetters}
        />
        <Languages wrongGuessCount={wrongGuessCount}/>
        <section className='word-container'>
          {wordElements}
        </section>
        <section className='keyboard'>
          {keyboardElements}
        </section>
        {isGameOver && <button className='new-game' onClick={startNewGame}>New Game</button>}
      </main>
  )
}
