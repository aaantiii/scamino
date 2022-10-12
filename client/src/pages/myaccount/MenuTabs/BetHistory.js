import './BetHistory.css'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../components/AuthContext'
import DataTable from '../../../components/DataTable'
import server from '../../../assets/lang/server.json'

const columns = ['Nummer', 'Wettbetrag', 'Datum', 'Gewinn', 'Mehr Info']
const order = ['id', 'amount', 'dateString', 'win', 'infoButton']

export default function BetHistory() {
  const [data, setData] = useState(),
        [tableRows, setTableRows] = useState(),
        [message, setMessage] = useState('Daten werden geladen...'),
        [moreInfoTab, setMoreInfoTab] = useState(),
        { userInfo } = useAuth()

  // Pfeil Button zum Anzeigen und Schließen von moreInfoTab
  function ArrowButton(props) {
    return (
      <button onClick={props.onClick} className="show-more">
        <i className={`fa-solid fa-arrow-${props.direction}`}></i>
      </button>
    )
  }

  function getNumberColor(number) {
    const parsed = parseInt(number)
    return parsed === 0 ? 'var(--theme-color)' : parsed % 2 === 0 ? 'red' : 'black'
  }

  // MoreInfoTab wird angezeigt wenn auf ArrowButton geklickt wird
  function MoreInfoTab({ bet }) {
    function closeShowMoreTab() {
      setMoreInfoTab()
    }

    const [date, time] = bet.dateString.split(' ')

    let keyVal = .354613

    return (
      <div id="more-info-tab">
        <div className="title-bar">
          <ArrowButton direction="left" onClick={closeShowMoreTab} />
          <h2>Wette #{bet.id}</h2>
        </div>
        <div className="bet-info">
        <table className="bet-info-table">
            <thead>
              <tr>
                <th>Zahl</th>
                <th>Einsatz</th>
                <th>Möglicher Gewinn</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(bet.tips).map(key =>
                <tr key={keyVal++}>
                  <td>
                    <span style={{ backgroundColor: getNumberColor(key) }}
                      className="roulette-number-circle">{key}</span>
                  </td>
                  <td>{bet.tips[key].toFixed(2)} EUR</td>
                  <td>{(bet.tips[key] * 14).toFixed(2)} EUR</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th>Gesamt</th>
                <td>{parseFloat(bet.amount).toFixed(2)} EUR</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <table className="bet-info-table outer-border-table">
            <tbody>
              <tr>
                <th>Gesamteinsatz:</th>
                <td>{parseFloat(bet.amount).toFixed(2)} EUR</td>
              </tr>
              <tr>
                <th>Gewinnbetrag:</th>
                <td>{parseFloat(bet.win).toFixed(2)} EUR</td>
              </tr>
              <tr>
                <th>Nettoergebnis:</th>
                <td>{(() => {
                  const nettoResult = bet.win - bet.amount

                  return <span style={ nettoResult === 0 ? {} : { color: nettoResult < 0
                    ? 'red'
                    : 'var(--default-green-hex)' }}>{nettoResult.toFixed(2)} EUR</span>
                })()}</td>
              </tr>
              <tr>
                <th>Gewinnzahl:</th>
                <td>
                  <span style={{ backgroundColor: getNumberColor(bet.roll) }}
                        className="roulette-number-circle">{bet.roll}</span>
                </td>
              </tr>
              <tr>
                <th>Multiplikator:</th>
                <td>{bet.win ? (bet.win / bet.amount).toFixed(2) : 0} <i className="fa-solid fa-xmark" /></td>
              </tr>
              <tr>
                <th>Gewinnchance:</th>
                <td>{Math.ceil(Object.keys(bet.tips).length / 15 * 100)} %</td>
              </tr>
              <tr>
                <th>Datum:</th>
                <td>{date}</td>
              </tr>
              <tr>
                <th>Uhrzeit:</th>
                <td>{time}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  useEffect(() => {
    if (!data) return

    // Eigenschaft infoButton zu jeder Spalte hinzufügen
    const rows = data
    rows.forEach(row => {
      row.infoButton = <ArrowButton direction="right" onClick={() => setMoreInfoTab(<MoreInfoTab bet={data.find(bet => bet.id === row.id)} />)} />
    })
    setTableRows(rows)
  }, [data])

  // Bets bei Backend anfordern
  useEffect(() => {
    if (data || !userInfo) return
    
    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/casino/bets`, { params: { userId: userInfo.id } })
    .then(res => {
      if (res.data)
        setData(res.data.bets)
    })
    .catch(() => setMessage(server.error.noResponse))
  }, [data, userInfo])
  
  return (
    (tableRows && (moreInfoTab || <DataTable columnNames={columns} data={data} order={order} />)) || <h2>{message}</h2>
  )
}
