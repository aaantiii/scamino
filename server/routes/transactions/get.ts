import Controller from '../../database/controller'
import { toDefaultDateTimeString } from '../../lib/default-formats'
import Scamino from '../../lib/models'

export function getTransactions(req: any, res: any) {
  const { userId }: { userId: number } = req.query
  if (!userId)
    return res.send({ success: false })

  Controller.selectAllWhere<Scamino.Transaction>('transactions', 'userId', userId, 'id', 'DESC')
  .then(transactions => {
    if (transactions) {
      transactions.forEach(transaction => {
        transaction.dateString = toDefaultDateTimeString(transaction.date)

        delete transaction.date
        delete transaction.userId
      })
      res.send({ transactions, success: true })
    }
  })
  .catch(() => res.send({ success: false }))
}
