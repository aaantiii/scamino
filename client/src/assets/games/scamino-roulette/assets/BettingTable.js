import { useEffect, useState } from 'react'
import { useAuth } from '../../../../components/AuthContext'
import lang from './lang.json'

export var bets = []
export function clearBets() {
  bets = []
}

export default function BettingTable() {
  const [stake, setStake] = useState(),
        [bettingNumbers, setBettingNumbers] = useState(),
        [message, setMessage] = useState(lang.bet.chooseStake),
        { userInfo, refreshUserBalance } = useAuth()

  //Wird 2x aufgerufen um schwarze und rote Reihe zu erzeugen
  function ColorRow(props) {
    const elements = []
    for (let i = 0; i < 7; i++) {
      const number = props.type === 'black'
        ? i * 2 + 1
        : i * 2 + 2

      elements.push(
        <div className={`betting-button ${props.type}`} key={number + .64569} onClick={(e) => addBet(number, e.target)}>
          <span>{number}</span>
        </div>
      )
    }

    return elements
  }

  // Wird 3x aufgerufen um grün, rot und schwarzen Bereich zu erstellen
  function BettingColors(props) {
    return props.type === 'green'
      ? <div className="betting-button green" key="bet0" onClick={() => addBet(0)}><span>0</span></div>
      : <ColorRow type={props.type} />
  }

  // Wenn auf anderen Coin geklickt wird
  function changeStake(e) {
    if (stake) {
      stake.coin.classList.remove('selected')

      // Bereits ausgewählten Coin angeklickt
      if (stake.coin === e.target)
        return setStake(null)
    }

    setStake({
      coin: e.target,
      value: parseFloat(e.target.getAttribute('value'))
    })
    e.target.classList.add('selected')
  }

  // Wird ausgelöst wenn mit Coin auf Nummer geklickt wird
  function addBet(tip) {
    if (!stake || !userInfo)
      return setMessage(lang.bet.chooseStake)
    if (userInfo.balance - stake.value < 0)
      return setMessage(lang.bet.balanceTooLow)

    let totalBetAmount = 0
    bets.forEach(bet => totalBetAmount += bet.stake)
    
    bets.push({
      tip,
      stake: stake.value
    })
    setMessage(`${stake.value.toFixed(2)} EUR auf ${tip} gesetzt.
                Gesamt: ${(totalBetAmount + stake.value).toFixed(2)} EUR`)
                
    refreshUserBalance(userInfo.balance - stake.value)
  }

  // Betting Numbers rerendern wenn Einsatz aktualisiert wird
  useEffect(() => {
    setBettingNumbers(
      <>
        <BettingColors type="green" />
        <BettingColors type="black" />
        <BettingColors type="red" />
      </>
    )
  }, [stake, userInfo])

  return (
    <div id="betting-table">
      <div id="cover-betting-table"></div>
      <div id="message-box">
        <label className="message">{message}</label>
      </div>
      <div id="betting-buttons">
        {bettingNumbers}
      </div>
      <div id="stake-coins">
        <img className="coin" alt="50 Cent Münze" src="/img/game-assets/deutsches-roulette/50cent.png" value=".5" onClick={changeStake} />
        <img className="coin" alt="1 Euro Münze" src="/img/game-assets/deutsches-roulette/1euro.png" value="1" onClick={changeStake} />
        <img className="coin" alt="5 Euro Münze" src="/img/game-assets/deutsches-roulette/5euro.png" value="5" onClick={changeStake} />
        <img className="coin" alt="10 Euro Münze" src="/img/game-assets/deutsches-roulette/10euro.png" value="10" onClick={changeStake} />
        <img className="coin" alt="25 Euro Münze" src="/img/game-assets/deutsches-roulette/25euro.png" value="25" onClick={changeStake} />
        <img className="coin" alt="100 Euro Münze" src="/img/game-assets/deutsches-roulette/100euro.png" value="100" onClick={changeStake} />
      </div>
    </div> 
  )
}
