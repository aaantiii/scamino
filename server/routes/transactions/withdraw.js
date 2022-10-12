"use strict";
exports.__esModule = true;
exports.createWithdrawal = void 0;
var controller_1 = require("../../database/controller");
var models_1 = require("../../lib/models");
function createWithdrawal(req, res) {
    var _a = req.body, userId = _a.userId, amount = _a.amount, method = _a.method;
    controller_1["default"].selectOne('users', 'id', userId)
        .then(function (user) {
        if (!user || user.balance < amount)
            return res.send({ success: false });
        var transaction = {
            userId: userId,
            amount: amount,
            method: method,
            type: models_1["default"].TransactionType.Withdrawal
        };
        controller_1["default"].startTransaction('transactions', ['userId', 'amount', 'method', 'type'], transaction, -transaction.amount)
            .then(function () { return res.send({ success: true }); })["catch"](function () { return res.send({ success: false }); });
    })["catch"](function () { return res.send({ success: false }); });
}
exports.createWithdrawal = createWithdrawal;
