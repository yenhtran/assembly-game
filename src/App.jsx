import { useState } from 'react'
import Header from './components/Header'
import Status from './components/Status'
import Languages from './components/Languages'

export default function AssemblyEndgame() {
  const [currentWord, setCurrentWord] = useState('react');

  const wordElements = currentWord.split('').map((letter, index) => <span
    className='word-letter'
    key={index}>{letter.toUpperCase()}</span>)

  return (
      <main>
        <Header />
        <Status />
        <Languages />
        <section className='word-container'>
          {wordElements}
        </section>
      </main>
  )
}
