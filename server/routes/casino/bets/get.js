"use strict";
exports.__esModule = true;
exports.getBetHistory = void 0;
var controller_1 = require("../../../database/controller");
var default_formats_1 = require("../../../lib/default-formats");
function getBetHistory(req, res) {
    var userId = req.query.userId;
    controller_1["default"].selectAllWhere('bets', 'userId', userId, 'id', 'DESC')
        .then(function (bets) {
        if (!bets)
            return res.send({ success: false });
        bets.forEach(function (bet) {
            delete bet.userId;
            bet.dateString = (0, default_formats_1.toDefaultDateTimeString)(bet.date);
        });
        res.send({ success: true, bets: bets });
    })["catch"](function () { return res.send({ success: false }); });
}
exports.getBetHistory = getBetHistory;
