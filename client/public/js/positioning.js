export function loadingFinished() {
  menubarFixed()
  pushFooter()
}

function menubarFixed() {
  const contentWrap = document.querySelector('#content-wrap')
  const nav = document.querySelector('nav')

  window.onscroll = () => {
    if (window.scrollY > nav.offsetTop + 60) {  //navbar 60px hoch
      nav.classList.add('position-fixed')
      contentWrap.classList.add('content-positioning-fixed-nav')
      return
    }
    nav.classList.remove('position-fixed');
    contentWrap.classList.remove('content-positioning-fixed-nav')
  }
}

//Wenn bei Mobilgeräten die Tastatur aktiv ist, verschiebt sich footer nach oben und würde Inhalte überdecken
function pushFooter() {
  //Wenn viewport größer als Tablet dann return
  if (window.innerWidth > 1024) return;

  const contentWrap = document.querySelector('#content-wrap')
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focusin', () =>
      contentWrap.style.marginBottom = '350px'
    )
    input.addEventListener('focusout', () =>
      contentWrap.style.marginBottom = '0px'
    )
  })
}
  