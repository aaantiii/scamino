import './style.css'
import components from '../../assets/lang/components.json'

export default function PromoBanner() {
  return (
    <div id="promo-banner">
      <article>
        <h2>
          <span>{components.promoBanner.titleWordsSplitted[0]}</span>
          <wbr />
          {components.promoBanner.titleWordsSplitted[1]}
        </h2>
        <p>{components.promoBanner.text}</p>
      </article>
    </div>
  )
}
