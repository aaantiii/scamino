"use strict";
exports.__esModule = true;
exports.getTransactions = void 0;
var controller_1 = require("../../database/controller");
var default_formats_1 = require("../../lib/default-formats");
function getTransactions(req, res) {
    var userId = req.query.userId;
    if (!userId)
        return res.send({ success: false });
    controller_1["default"].selectAllWhere('transactions', 'userId', userId, 'id', 'DESC')
        .then(function (transactions) {
        if (transactions) {
            transactions.forEach(function (transaction) {
                transaction.dateString = (0, default_formats_1.toDefaultDateTimeString)(transaction.date);
                delete transaction.date;
                delete transaction.userId;
            });
            res.send({ transactions: transactions, success: true });
        }
    })["catch"](function () { return res.send({ success: false }); });
}
exports.getTransactions = getTransactions;
