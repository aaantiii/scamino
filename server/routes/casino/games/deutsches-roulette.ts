import Controller from '../../../database/controller'
import Scamino from '../../../lib/models'

export function createRouletteBet(req: any, res: any) {
  const { userId, bets }: { userId: number, bets: { tip: number, stake: number }[]} = req.body

  Controller.selectOne<Scamino.User>('users', 'id', userId)
  .then(user => {
    if (!user)
      return res.send({ error: true })

    const roll = rollRoulette()
    
    let amount = 0
    bets.forEach(bet => amount += bet.stake)
    
    if (user.balance < amount)
      return res.send({ error: true })
    
    let rouletteBet: Scamino.RouletteBet = {
      userId,
      amount,
      win: 0,
      roll
    }

    let tipsMap = new Map<number, number>()
    bets.forEach(bet => {
      if (bet.tip === roll)
        rouletteBet.win += bet.stake * 14

      if (!tipsMap.has(bet.tip))
        tipsMap.set(bet.tip, 0)
      tipsMap.set(bet.tip, tipsMap.get(bet.tip) + bet.stake)
    })

    rouletteBet.tips = JSON.stringify(Object.fromEntries(tipsMap.entries()))
    Controller.startTransaction<Scamino.RouletteBet>('bets', ['userId', 'amount', 'win', 'roll', 'tips'], rouletteBet, rouletteBet.win - rouletteBet.amount)
    .then(() => res.send(rouletteBet))
    .catch(() => res.send({ error: true }))
  })
  .catch(() => res.send({ error: true }))
}

function rollRoulette() {
  return Math.floor(Math.random() * 15)
}
