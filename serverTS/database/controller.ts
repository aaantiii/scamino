import pool from './pool'
import Scamino from '../lib/types'

class Controller {
  /**
   * Fügt einen Datensatz in die entsprechende Tabelle ein.
   * @param table Name der Tabelle in welche der Datensatz eingefügt wird
   * @param insertColumns Name der Datenbank Attribute in welche die Werte eingefügt werden
   * @param insertObject Einzufügender Datensatz als Objekt
   */
  static insertOne<T>(table: string, insertColumns: string[], insertObject: T) {
    return new Promise<void>((resolve, reject) => {
      pool.getConnection((conErr, con) => {
        if (conErr)
          return reject(conErr)
        
        const insertValues = insertColumns.map(key => insertObject[key])
        
        con.query(`INSERT INTO ${table} (${insertColumns}) VALUES (:insertValues);`, { insertValues },
        err => {
          if (err)
            reject(err)

          resolve()
          con.release()
        })
      })
    })
  }

  /**
   * Erstellt eine Geldtransaktion oder eine Roulette Wette.
   * @param table 
   * @param insertColumns 
   * @param data 
   * @param balanceChangeAmount 
   * @returns 
   */
  static startTransaction<T>(table: string, insertColumns: string[], data: T, balanceChangeAmount: number) {
    return new Promise<void>((resolve, reject) => {
      pool.getConnection((conErr, con) => {
        if (conErr)
          return reject(conErr)

        con.beginTransaction(transactionErr => {
          if (transactionErr)
            return con.rollback(() => reject(transactionErr))
    
          const insertValues = insertColumns.map(key => data[key])

          con.query(`INSERT INTO ${table} (${insertColumns}) VALUES (:insertValues);`,
          { insertValues },
          insertErr => {
            if (insertErr)
              return con.rollback(() => reject(insertErr))
    
            con.query('UPDATE users SET balance = balance + :balanceChangeAmount WHERE id = :userId;',
            { balanceChangeAmount, ...data },
            updateErr => {
              if (updateErr)
                return con.rollback(() => {
                  reject(updateErr)
                  con.release()
                })
  
              con.commit(commitErr => {
                if (commitErr)
                  return con.rollback(() => {
                    reject(commitErr)
                    con.release()
                  })
  
                resolve()
                con.release()
              })
            })
          })
        })
      }) 
    })
  }

  static selectOne<T>(table: string, keyName: string, keyValue: string | number) {
    return new Promise<T>((resolve, reject) => {
      pool.getConnection((conErr, con) => {
        if (conErr)
          return reject(conErr)

        con.query(`SELECT * FROM ${table} WHERE ${keyName} = :keyValue;`, { keyValue },
        (err, data) => {
          if (err)
            reject(err)

          resolve(data[0])
          con.release()
        })
      })
    })
  }

  static selectAll<T>(table: string, keyName: string, keyValue: string | number, orderKeyName: string, order: string) {
    return new Promise<T[]>((resolve, reject) => {
      pool.getConnection((conErr, con) => {
        if (conErr) {
          con.release()
          return reject(conErr)
        }

        con.query(`SELECT * FROM ${table} WHERE ${keyName} = :keyValue ORDER BY ${orderKeyName} ${order};`, { keyValue },
        (err, data) => {
          if (err)
            reject(err)

          resolve(data)
          con.release()
        })
      })
    })
  }

  static selectSpecificJoinLeft<T>(leftTable: string, rightTable: string, leftKeyName: string | number, rightKeyName: string | number, selectedValues: string[]) {
    return new Promise<T[]>((resolve, reject) => {
      pool.getConnection((conErr, con) => {
        if (conErr)
          return reject(conErr)

        con.query(`SELECT ${selectedValues} FROM ${leftTable} LEFT JOIN ${rightTable} ON ${leftTable}.${leftKeyName} = ${rightTable}.${rightKeyName};`,
        (mysqlErr, data) => {
          if (mysqlErr) 
            reject(mysqlErr)

          resolve(data)
          con.release()
        })
      })
    })
  }

  /**
   * Funktion um eine Zeile in einer Tabelle zu verändern
   * @param table Tabellenname der zu ändernden Tabelle
   * @param updatedColumns Spaltennamen der zu verändernden Werte
   * @param data Werte der zu verändernden Spalten als Objekt
   */
  static updateOne(table: string, keyName: string, updatedColumns: string[], data: Scamino.User) {
    return new Promise<void>((resolve, reject) => {
      pool.getConnection((conErr, con) => {
        if (conErr)
          return reject(conErr)

        const updatedColumnsWithParams = updatedColumns.map(column => `${column} = :${column}`)
        const sql = `UPDATE ${table} SET ${updatedColumnsWithParams} WHERE ${keyName} = :${keyName};`

        con.query(sql, data, err => {
          if (err)
            reject(err)

          resolve()
          con.release()
        })
      })  
    })
  }
}

export default Controller