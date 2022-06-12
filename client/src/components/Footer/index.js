import './style.css'
import components from '../../assets/lang/components.json'

export default function Footer() {
  let keyVal = .8359
  return (
    <footer>
      <section id="footer-navigation">
        {components.footer.navigation.map(element => {
          return (
            <div key={keyVal++}>
              <h3>{element.title.toUpperCase()}</h3>
              <ul>
                {element.content.map(content => {
                  return (<li key={keyVal++}><a href={content.link} target={element.redirect} hidefocus="true">{content.text}</a></li>)
                })}
              </ul>
            </div>
          )
        })}
      </section>
      <hr />
      <section id="footer-payment-methods">
        {components.footer.paymentMethods.map(paymentMethod => 
          <img src={paymentMethod.path} alt={paymentMethod.name} loading="lazy" key={keyVal++} 
               onClick={() => window.open(paymentMethod.url, '_blank')} />)}
      </section>
    </footer>
  )
}
