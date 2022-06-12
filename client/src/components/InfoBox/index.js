import './style.css'
import server from '../../assets/lang/server.json'

export default function InfoBox(props) {
  if (!props.json)
    return (
      <div id="info-box">
        <h2>{server.error.unknown}</h2>
      </div>
    )
  
  let keyVal = 0xabcd
  return (
    <div id="info-box">
      <h1>{props.json.title}</h1>
      {props.json.articles.map(article => {
        return (
          <article key={keyVal++}>
            <h2 key={keyVal++}>{article.title}</h2>
            {article.paragraphs.map(paragraph => {
              return (
                <p key={keyVal++}>{paragraph}</p>
              )
            })}
          </article>
        )
      })}
    </div>
  )
}
