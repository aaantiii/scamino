import { createPool } from 'mysql'
import { setGameList } from '../routes/casino/games/get-all'

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

const pool = createPool({
  queryFormat: objectParamsFormat,
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

function tryConnection() {
  pool.getConnection((err, con) => {
    if (err) {
      console.error(`Datenbank auf Port ${process.env.DB_PORT} nicht erreichbar. Wird in 15 Sekunden erneut versucht...`)
      return setTimeout(tryConnection, 15000)
    }
  
    con.release()
    setGameList()
    console.log(`Datenbank erreichbar (PORT: ${process.env.DB_PORT}).`)
  })
}

tryConnection()

export default pool