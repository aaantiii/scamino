"use strict";
exports.__esModule = true;
exports.updateUser = void 0;
var controller_1 = require("../../database/controller");
function updateUser(req, res) {
    var userInfo = req.body.userInfo;
    if (!userInfo)
        return res.send({ success: false });
    controller_1["default"].updateOne('users', 'id', ['firstName', 'lastName', 'phone', 'street', 'country', 'city', 'zip'], userInfo)
        .then(function () { return res.send({ success: true }); })["catch"](function () { return res.send({ success: false }); });
}
exports.updateUser = updateUser;
