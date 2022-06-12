import { useEffect, useState } from 'react'
import DataTable from '../../../components/DataTable'
import Axios from 'axios'
import server from '../../../assets/lang/server.json'
import { useAuth } from '../../../components/AuthContext'

const columns = ['Nummer', 'Betrag', 'Zahlungsmethode', 'Datum', 'Art']
const order = ['id', 'amount', 'method', 'dateString', 'type']

export default function TransactionHistory() {
  const [data, setData] = useState(),
        [message, setMessage] = useState('Daten werden geladen...'),
        { userInfo } = useAuth()

  // Transaktions Daten bei Backend anfordern
  useEffect(() => {
    if (!data && userInfo) {
      Axios.get(`${process.env.REACT_APP_BACKEND_URL}/transactions`, { params: { userId: userInfo.id } } )
      .then(res => {
        if (res.data) {
          setData(res.data.transactions)
        }
      })
      .catch(() => setMessage(server.error.noResponse))
    }
  }, [data, userInfo, setMessage])
  
  return (
    data
      ? <DataTable columnNames={columns} data={data} order={order} />
      : <h2>{message}</h2>
  )
}
