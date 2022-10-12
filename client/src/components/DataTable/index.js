import './style.css'
import { useMemo } from 'react'
import server from '../../assets/lang/server.json'

export default function DataTable(props) {
  function TableRow({ row }) {
    let tableData = []
    let keyVal = Math.random()

    for(let i = 0; i < props.columnNames.length; i++)
      tableData.push(<td key={keyVal++}>{row[props.order[i]]}</td>)

    return <tr>{tableData}</tr>
  }

  // Konvertierung CSV: https://stackoverflow.com/questions/11257062/converting-json-object-to-csv-format-in-javascript
  const csvFileUrl = useMemo(() => {
    if (!props.data || props.data.length === 0) return

    const csv = [Object.keys(props.data[0])].concat(props.data)

    const file = new Blob([csv.map(it => {
      return Object.values(it).toString()
    }).join('\n')], {type: "text/csv"})

    const fileUrl = window.URL.createObjectURL(file)

    window.onbeforeunload = () => {
      window.URL.revokeObjectURL(fileUrl)
      window.onbeforeunload = null
    }

    return fileUrl
  }, [props.data])

  const dataTable = useMemo(() => {
    let keyVal = .0325198
    return (
      <div id="table-center">
        <div id="table-container">
          {!props.data || !props.order || !props.columnNames
          ? <h2>{server.error.read}</h2>
          : props.data.length > 0 
            ? (
              <>
                <div className="table-top-bar">
                  <a download="user-data.csv" href={csvFileUrl}>CSV exportieren</a>
                </div>
                <table>
                  <thead>
                    <tr>
                      {props.columnNames.map(col => <th key={keyVal++}>{col}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {props.data.map(row =>
                      <TableRow row={row} key={keyVal++} />
                    )}
                  </tbody>
                </table>
              </>)
            : <h2>{server.error.noDataAvailableYet}</h2>}
        </div>
      </div>
    )
  }, [props, csvFileUrl])

  return dataTable
}
