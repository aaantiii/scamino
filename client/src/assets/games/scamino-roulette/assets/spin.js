import Axios from 'axios'

// Wird nach Ablauf des Timers im index aufgerufen
// Gibt einen Promise zurück welcher von animateSpin zurückgegeben wird
export default async function startRound(bets, userId) {
  if (bets.length === 0) return { win: 0 }

  // Neue Wette im Backend erstellen
  const { roll, win, error } = (await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/casino/bets/create`, {
    userId,
    bets
  })).data

  // Wenn im Backend beim erstellen der Wette ein Fehler aufgetreten ist, Runde mit 0 Gewinn
  if (error)
    return { win: 0 }
  
  return animateSpin(roll, win)
}

// Spin mit erzeugter Nummer vom Backend animieren
// Gewinn wird erst returned wenn die Animation vorbei ist
function animateSpin(roll, win) {
  const wheel = document.querySelector('#wheel'),
        numbers = document.querySelectorAll('[rollable]'),
        wheelContainer = document.querySelector('#wheel-container')

  // Zur Sicherheit falls Nutzer HTML editiert hat
  if (!numbers || !wheel) return
  if (numbers.length !== 15) return

  const rolledNumberElement = numbers[roll]

  // Pixel wie weit die Nummer vom sichtbaren Bereich entfernt ist
  // Minus die halbe Wheelbreite damit die Zahl in der Mitte ist
  let transformX = rolledNumberElement.offsetLeft - wheelContainer.clientWidth / 2

  // Zufällig zwischen 0 und der Breite des Nummernelements Pixel hinzufügen damit
  // der Stopper irgendwo dazwischen landet
  transformX += Math.random() * rolledNumberElement.clientWidth

  wheel.style.transform = 'none' // Auf Standardposition zurücksetzen
  const keyframes = [
    { transform: 'none' },
    { transform: `translateX(-${transformX}px)` }
  ]

  // Promise der die Animation ausführt
  // Wird von startRound() an index zurückgegeben und dort awaited
  return new Promise((resolve, reject) => {
    const animation = wheel.animate(keyframes, { duration: 6000 + Math.random() * 4000, easing: 'ease-out' })
    animation.addEventListener('finish', () => {
      wheel.style.transform = `translateX(-${transformX}px)`
      resolve({ win })
    })
    animation.addEventListener('cancel', reject)
  })
  .catch(console.log)
}
