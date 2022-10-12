"use strict";
exports.__esModule = true;
exports.getChartData = void 0;
var controller_1 = require("../../database/controller");
function getChartData(req, res) {
    var userId = req.query.userId;
    if (!userId)
        return res.send({ success: false });
    Promise.all([
        controller_1["default"].selectAllWhere('bets', 'userId', userId, 'id', 'DESC'),
        controller_1["default"].selectAllWhere('transactions', 'userId', userId, 'id', 'DESC')
    ])
        .then(function (results) {
        var bets = results[0], transactions = results[1];
        if (!bets || !transactions)
            return res.send({ success: false });
        res.send({ bets: bets, transactions: transactions, success: true });
    })["catch"](function () { return res.send({ success: false }); });
}
exports.getChartData = getChartData;
