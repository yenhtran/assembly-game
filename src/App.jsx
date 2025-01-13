import { useState } from 'react'
import clsx from 'clsx'
import Header from './components/Header'
import Status from './components/Status'
import Languages from './components/Languages'
import { languages } from './languages'

export default function AssemblyEndgame() {
  // State values
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length
  const isGameWon = currentWord.split('').every(char => guessedLetters.includes(char));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost

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

  return (
      <main>
        <Header />
        <Status />
        <Languages wrongGuessCount={wrongGuessCount}/>
        <section className='word-container'>
          {wordElements}
        </section>
        <section className='keyboard'>
          {keyboardElements}
        </section>
        {isGameOver && <button className='new-game'>New Game</button>}
      </main>
  )
}
