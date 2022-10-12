"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var express = require("express");
var cors = require("cors");
var routes_1 = require("./routes");
var app = express();
// App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    methods: ['GET', 'POST', 'PUT'],
    origin: process.env.FRONTEND_URL
}));
// HTTP Routes
app.get('/casino/games', routes_1.casino.getGames);
app.get('/casino/bets', routes_1.casino.getBetHistory);
app.post('/casino/bets/create', routes_1.casino.createRouletteBet);
app.post('/users/getorcreate', routes_1.users.getOrCreateUser);
app.put('/users/update', routes_1.users.updateUser);
app.get('/charts', routes_1.users.getChartData);
app.get('/transactions', routes_1.transactions.getTransactions);
app.post('/transactions/withdraw', routes_1.transactions.createWithdrawal);
app.post('/transactions/deposit', routes_1.transactions.createDeposit);
app.listen(process.env.HTTP_PORT, function () {
    console.log("HTTP Server auf Port ".concat(process.env.HTTP_PORT, " bereit."));
});
