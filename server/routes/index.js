"use strict";
exports.__esModule = true;
exports.transactions = exports.users = exports.casino = void 0;
var game_list_1 = require("./casino/games/game-list");
var get_1 = require("./casino/bets/get");
var deutsches_roulette_1 = require("./casino/games/deutsches-roulette");
var get_2 = require("./transactions/get");
var deposit_1 = require("./transactions/deposit");
var withdraw_1 = require("./transactions/withdraw");
var update_1 = require("./users/update");
var get_charts_1 = require("./users/get-charts");
var get_or_create_1 = require("./users/get-or-create");
exports.casino = {
    getGames: game_list_1.getGames,
    getBetHistory: get_1.getBetHistory,
    createRouletteBet: deutsches_roulette_1.createRouletteBet
};
exports.users = {
    getOrCreateUser: get_or_create_1.getOrCreateUser,
    getChartData: get_charts_1.getChartData,
    updateUser: update_1.updateUser
};
exports.transactions = {
    createWithdrawal: withdraw_1.createWithdrawal,
    createDeposit: deposit_1.createDeposit,
    getTransactions: get_2.getTransactions
};
