import { createPool } from 'mysql2'
import { refreshGameList } from '../routes/casino/games/get-all'

// Objekt als Parameter statt Array verwenden
// https://github.com/mysqljs/mysql#custom-format
function objectParamsFormat (query: string, params: object): string {
  if (!params) return query

  return query.replace(/\:(\w+)/g, function (paramName: string, key: string): string {
    if (params.hasOwnProperty(key))
      return this.escape(params[key])
    return paramName
  }.bind(this))
}

// Bei mysql2 wird type NEWDECIMAL immer als String zurückgegeben
// --> wird in dieser Funktion wieder in Nummer umgewandelt
function castNewDecimal(field: any, next: Function) {
  if (field.type === 'NEWDECIMAL') {
    const value = field.string()
    return (value === null) ? null : Number(value)
  }
  return next()
}

const pool = createPool({
  queryFormat: objectParamsFormat,
  typeCast: castNewDecimal,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT)
})

const defaultMessage = `MySQL Datenbank auf Port ${process.env.DB_PORT}`
function testPoolConnection() {
  pool.getConnection((err, con) => {
    if (err) {
      console.log(`${defaultMessage} nicht erreichbar. Wird in 15 Sekunden erneut versucht...`)
      return setTimeout(testPoolConnection, 15000)
    }
  
    con.release()
    refreshGameList()
    console.log(`${defaultMessage} erreichbar.`)
  })
}

testPoolConnection()

export default pool