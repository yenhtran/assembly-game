import { languages } from '../languages'
import clsx from 'clsx'

export default function Languages({ wrongGuessCount }) {
  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }

    const className = clsx('language-chip', isLanguageLost && 'lost')

    return (
      <span
        key={lang.name}
        className={className}
        style={styles}
      >{lang.name}</span>
    )
  })
  return (
    <section className="language-container">
      {languageElements}
    </section>
  )
}