import Controller from '../../database/controller'
import { getDefaultDateString } from '../../lib/default-formats'
import Scamino from '../../lib/types'

export function getBetHistory(req: any, res: any) {
  const { userId }: { userId: number } = req.query

  Controller.selectAll<Scamino.RouletteBet>('bets', 'userId', userId, 'id', 'DESC')
  .then(bets => {
    if (!bets)
      return res.send({ success: false })
 
    bets.forEach(bet => {
      delete bet.userId
      bet.dateString = getDefaultDateString(bet.date)
    })
    res.send({ success: true, bets })
  })
  .catch(() => res.send({ success: false }))
}
