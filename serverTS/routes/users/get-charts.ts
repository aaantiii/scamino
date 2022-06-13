import Controller from '../../database/controller'
import Scamino from '../../lib/types'

export async function getChartData(req: any, res: any) {
  const { userId }: { userId: number } = req.query

  if (!userId)
    return res.send({ success: false })

  const bets = await Controller.selectAllWhere<Scamino.RouletteBet>('bets', 'userId', userId, 'id', 'DESC')
  const transactions = await Controller.selectAllWhere<Scamino.Transaction>('transactions', 'userId', userId, 'id', 'DESC')

  if (!bets || !transactions)
    return res.send({ success: false })

  res.send({ bets, transactions, success: true })
}
