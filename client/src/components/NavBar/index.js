import { useEffect } from 'react'
import Elements from './Elements'
import './style.css'

export default function NavBar() {
  useEffect(() => {
    const contentWrap = document.querySelector('#content-wrap')
    const nav = document.querySelector('nav')

    //Wenn Seite langsam lädt kann es sein dass Nav noch nicht im HTML Code ist
    if (nav)
      window.onscroll = () => animation(nav, contentWrap)
  }, [])

  return (
    <nav>
      <div id="logo"><a href="/#"><span>SCAM</span>INO</a></div>
      <Elements />
    </nav>
  )
}

//Animation für (position: fixed) wenn nav nicht mehr sichtbar bei scrollen
/**
 * @param {Element} nav 
 * @param {Element} contentWrap 
 * @returns {void}
 */
function animation(nav, contentWrap) {
  if (window.scrollY > nav.offsetTop + nav.clientHeight) {
    nav.classList.add('position-fixed')
    contentWrap.classList.add('content-positioning-fixed-nav')
    return
  }
  nav.classList.remove('position-fixed');
  contentWrap.classList.remove('content-positioning-fixed-nav')
}

NavBar.defaultProps = {
  loggedIn: false
}
