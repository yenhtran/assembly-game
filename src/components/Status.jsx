import clsx from 'clsx'
export default function Status({ isGameWon, isGameLost}) {
  const className = clsx({
    won: isGameWon,
    lost: isGameLost
  })

  const visibilityStyles = { visibility: isGameWon || isGameLost ? 'visible' : 'hidden'}

  return (
    <section className={'game-status ' + className}>
      <h2 style={visibilityStyles}>{isGameWon ? 'You win!' : isGameLost ? 'Game over!' : 'Purposely left hidden'}</h2>
      <p style={visibilityStyles}>{isGameWon ? 'Well done!🎉' : isGameLost ? 'You lose! Better start learning Assembly 😭' : 'Purposely left hidden'}</p>
    </section>
  )
}