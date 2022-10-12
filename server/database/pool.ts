import { createPool } from 'mysql2'
import { refreshGameList } from '../routes/casino/games/game-list'

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
// --> wird in dieser Funktion wieder in Number umgewandelt
function castNewDecimal(field: any, next: () => void) {
  if (field.type === 'NEWDECIMAL') {
    const value = field.string()
    return value ?? Number(value)
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

const defaultPrefix = `MySQL Datenbank auf Port ${process.env.DB_PORT}`

const retryStepsInSeconds = [15, 30, 60, 120]
let retryIndex = 0

function testPoolConnection() {
  pool.getConnection((conErr, con) => {
    if (conErr) {
      const timeoutInSeconds = retryStepsInSeconds[retryIndex++] ?? retryStepsInSeconds.slice(-1)[0]
      console.log(`${defaultPrefix} nicht erreichbar. Wird in ${timeoutInSeconds} Sekunden erneut versucht...`)
      return setTimeout(testPoolConnection, timeoutInSeconds * 1000)
    }
  
    con.release()
    refreshGameList()
    console.log(`${defaultPrefix} erreichbar.`)
  })
}

testPoolConnection()

export default pool
