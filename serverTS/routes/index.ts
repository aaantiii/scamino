import { getGames } from './casino/games/get-all'
import { getBetHistory } from './casino/get-bets'
import { createRouletteBet } from './casino/games/deutsches-roulette'

import { createDeposit } from './transactions/deposit'
import { getTransactions } from './transactions/get-all'
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
