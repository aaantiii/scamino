"use strict";
exports.__esModule = true;
exports.createRouletteBet = void 0;
var controller_1 = require("../../../database/controller");
function createRouletteBet(req, res) {
    var _a = req.body, userId = _a.userId, bets = _a.bets;
    controller_1["default"].selectOne('users', 'id', userId)
        .then(function (user) {
        if (!user)
            return res.send({ error: true });
        var roll = rollRoulette();
        var amount = 0;
        bets.forEach(function (bet) { return amount += bet.stake; });
        if (user.balance < amount)
            return res.send({ error: true });
        var rouletteBet = {
            userId: userId,
            amount: amount,
            win: 0,
            roll: roll
        };
        var tipsMap = new Map();
        bets.forEach(function (bet) {
            if (bet.tip === roll)
                rouletteBet.win += bet.stake * 14;
            if (!tipsMap.has(bet.tip))
                tipsMap.set(bet.tip, 0);
            tipsMap.set(bet.tip, tipsMap.get(bet.tip) + bet.stake);
        });
        rouletteBet.tips = JSON.stringify(Object.fromEntries(tipsMap.entries()));
        controller_1["default"].startTransaction('bets', ['userId', 'amount', 'win', 'roll', 'tips'], rouletteBet, rouletteBet.win - rouletteBet.amount)
            .then(function () { return res.send(rouletteBet); })["catch"](function () { return res.send({ error: true }); });
    })["catch"](function () { return res.send({ error: true }); });
}
exports.createRouletteBet = createRouletteBet;
function rollRoulette() {
    return Math.floor(Math.random() * 15);
}
