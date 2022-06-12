import Controller from '../../database/controller'
import Scamino from '../../lib/types'

export function createWithdrawal(req: any, res: any) {
  const { userId, amount, method }: {
    userId: number,
    amount: number,
    method: Scamino.PaymentMethod
  } = req.body
  
  Controller.selectOne<Scamino.User>('users', 'id', userId)
  .then(user => {
    if (!user || user.balance < amount) 
      return res.send({ success: false })

    const transaction: Scamino.Transaction = {
      userId,
      amount,
      method,
      type: Scamino.TransactionType.Withdrawal
    }
  
    Controller.startTransaction('transactions', ['userId', 'amount', 'method', 'type'], transaction, -transaction.amount)
    .then(() => res.send({ success: true }))
    .catch(() => res.send({ success: false }))
  })
  .catch(() => res.send({ success: false }))
}
