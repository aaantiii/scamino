import { getGames } from './casino/games/game-list'
import { getBetHistory } from './casino/bets/get'
import { createRouletteBet } from './casino/games/deutsches-roulette'

import { getTransactions } from './transactions/get'
import { createDeposit } from './transactions/deposit'
import { createWithdrawal } from './transactions/withdraw'

import { updateUser } from './users/update'
import { getChartData } from './users/get-charts'
import { getOrCreateUser } from './users/get-or-create'


export const casino = {
  getGames,
  getBetHistory,
  createRouletteBet
}

export const users = {
  getOrCreateUser,
  getChartData,
  updateUser
}

export const transactions = {
  createWithdrawal,
  createDeposit,
  getTransactions
}
