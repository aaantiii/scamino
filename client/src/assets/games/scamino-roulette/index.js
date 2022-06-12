import './assets/style.css'
import Wheel from './assets/Wheel'
import BettingTable, { bets, clearBets } from './assets/BettingTable'
import startRound from './assets/spin'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../components/AuthContext'

const timeToNextSpin = 20

export default function Roulette() {
  const [time, setTime] = useState(timeToNextSpin),
        [message, setMessage] = useState(''),
        { userInfo, refreshUserInfo } = useAuth()

  // Benachrichtigungen 3 Sekunden lang anzeigen
  useEffect(() => {
    if (message === '') return
    setTimeout(() => setMessage(''), 3000)
  }, [message])

  // Timer Countdown; Bei 0 starte die Runde
  useEffect(() => {
    async function tick() {
      if (time > 0)
        return setTimeout(() => setTime(time - 1), 1000)
      
      if (bets.length === 0) {
        setTime(timeToNextSpin)
        return setMessage('Warte auf Einsätze...')
      }

      setMessage('')

      const bettingTableCover = document.querySelector('#cover-betting-table')
      bettingTableCover.style.display = 'inline'

      const round = await startRound(bets, userInfo.id)

      if (round.win)
        setMessage(`Du hast ${round.win.toFixed(2)} EUR gewonnen!`)

      refreshUserInfo()
      clearBets()

      bettingTableCover.style.display = 'none'
      setTime(timeToNextSpin)
    }
    tick()
  }, [time, setTime, userInfo, refreshUserInfo])

  return (
    <>
      <div id="wheel-container">
        <div id="stopper"></div>
        <Wheel />
      </div>
      {message && <div id="win-message">{message}</div>}
      <div id="time">
        <span>{time}</span>
      </div>
      <BettingTable />
    </>
  )
}
