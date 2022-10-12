import Controller from '../../database/controller'
import Scamino from '../../lib/models'

export function createDeposit(req: any, res: any) {
  const { userId, amount, method }: {
    userId: number,
    amount: number,
    method: Scamino.PaymentMethod
  } = req.body

  const transaction: Scamino.Transaction = {
    userId,
    amount,
    method,
    type: Scamino.TransactionType.Deposit
  }

  Controller.startTransaction('transactions', ['userId', 'amount', 'method', 'type'], transaction, transaction.amount)
  .then(() => res.send({ success: true }))
  .catch(() => res.send({ success: false }))
}
