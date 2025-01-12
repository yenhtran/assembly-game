import { useState } from 'react'
import Header from './components/Header'
import Status from './components/Status'
import Languages from './components/Languages'

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState('react');
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wordElements = currentWord.split('').map((letter, index) => <span
  className='word-letter'
  key={index}>{letter.toUpperCase()}</span>)

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const keyboardElements = alphabet.split('').map(letter => {
    return (
      <button
        onClick={() => addGuessedLetter(letter)}
        className='keyboard-letter'
        key={letter}
        aria-label={`Keyboard chip: ${letter}`}
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
        <Languages />
        <section className='word-container'>
          {wordElements}
        </section>
        <section className='keyboard'>
          {keyboardElements}
        </section>
        <button className='new-game'>New Game</button>
      </main>
  )
}
