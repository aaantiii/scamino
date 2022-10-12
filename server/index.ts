import { config } from 'dotenv'
config()

import * as express from 'express'
import * as cors from 'cors'
import { casino, users, transactions } from './routes'

const app = express()

// App Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  methods: ['GET', 'POST', 'PUT'],
  origin: process.env.FRONTEND_URL
}))

// HTTP Routes
app.get('/casino/games', casino.getGames)
app.get('/casino/bets', casino.getBetHistory)
app.post('/casino/bets/create', casino.createRouletteBet)

app.post('/users/getorcreate', users.getOrCreateUser)
app.put('/users/update', users.updateUser)
app.get('/charts', users.getChartData)

app.get('/transactions', transactions.getTransactions)
app.post('/transactions/withdraw', transactions.createWithdrawal)
app.post('/transactions/deposit', transactions.createDeposit)

app.listen(process.env.HTTP_PORT, () => {
  console.log(`HTTP Server auf Port ${process.env.HTTP_PORT} bereit.`)
})
