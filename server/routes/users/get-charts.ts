import Controller from '../../database/controller'
import Scamino from '../../lib/models'

export function getChartData(req: any, res: any) {
  const { userId }: { userId: number } = req.query

  if (!userId)
    return res.send({ success: false })

  Promise.all([
    Controller.selectAllWhere<Scamino.RouletteBet>('bets', 'userId', userId, 'id', 'DESC'),
    Controller.selectAllWhere<Scamino.Transaction>('transactions', 'userId', userId, 'id', 'DESC')
  ])
  .then(results => {
    const [bets, transactions] = results

    if (!bets || !transactions)
      return res.send({ success: false })

    res.send({ bets, transactions, success: true })
  })
  .catch(() => res.send({ success: false }))
}