import './style.css'
import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import CanvasJSReact from '../../../assets/canvasjs/canvasjs.react'
import { useAuth } from '../../../components/AuthContext'
import server from '../../../assets/lang/server.json'

const CanvasJS = CanvasJSReact.CanvasJS
const CanvasJSChart = CanvasJSReact.CanvasJSChart

CanvasJS.addColorSet('green-red', ['#009600', '#cc1010'])

function getChartDefaultOptions() {
  return {
    title: {
      fontFamily: 'Open Sans',
      fontSize: '24',
      fontWeight: 'bold',
      margin: 10
    },
    colorSet: 'green-red',
    axisY: {
      minimum: 0,
      labelFontFamily: 'Open Sans',
      valueFormatString: '€ #,##0'
    },
    axisX: {
      labelFontSize: 18,
      labelFontFamily: 'Open Sans',
      labelMargin: 10
    },
    theme: 'dark1',
    backgroundColor: 'black'
  }
}

export default function Charts() {
  const [data, setData] = useState()
  const [error, setError] = useState()
  const { userInfo } = useAuth()

  // Daten für Diagramme bei Backend anfordern
  useEffect(() => {
    if (data || !userInfo) return

    Axios.get(`${process.env.REACT_APP_BACKEND_URL}/charts`, { params: { userId: userInfo.id } })
    .then(res => {
      if (!res.data.success)
        return setError(server.error.noResponse)
      
      setData(res.data)
    })
    .catch(() => setError(`${server.error.unknown} ${server.error.retry}`))
  }, [data, setData, setError, userInfo])

  // Datenobjekt für Gewinne und Einsätze Diagramm erstellen
  function getBetChartOptions() {
    let wins = 0
    let stakes = 0

    data.bets.forEach(bet => {
      wins += bet.win
      stakes += bet.amount
    })

    const options = getChartDefaultOptions()
    options.data = [{
      type: 'column',
      dataPoints: [
        { label: 'Gewinne', y: wins },
        { label: 'Einsätze', y: stakes }
      ],
      yValueFormatString: "€ #,##0.00"
    }]
    options.title.text = 'Gewinne und Einsätze'

    return options
  }

  // Datenobjekt für Einzahlungen und Auszahlungen Diagramm erstellen
  function getTransactionChartOptions() {
    let deposits = 0
    let withdrawals = 0

    data.transactions.forEach(transaction => {
      transaction.type === 'deposit'
        ? deposits += transaction.amount
        : withdrawals += transaction.amount 
    })

    const options = getChartDefaultOptions()
    options.data = [{
      type: 'column',
      dataPoints: [
        { label: 'Ausgänge', y: withdrawals },
        { label: 'Eingänge', y: deposits }
      ],
      yValueFormatString: "€ #,##0.00"
    }]
    options.title.text = 'Ein- und Auszahlungen'
    return options
  }

  return (
    <>
      <h1>Deine Spielübersicht</h1>
      <div id="charts">
        <div className="chart">
          {(data && <CanvasJSChart options={getBetChartOptions()}></CanvasJSChart>) || <span>{error}</span>}
        </div>
        <div className="chart">
          {(data && <CanvasJSChart options={getTransactionChartOptions()}></CanvasJSChart>) || <span>{error}</span>}
        </div>
      </div>
    </>
  )
}
