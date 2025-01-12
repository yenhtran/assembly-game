import { languages } from '../languages'

export default function Languages() {
  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color
    }

    return (
      <span
        key={lang.name}
        className='language-chip'
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