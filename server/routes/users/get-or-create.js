"use strict";
exports.__esModule = true;
exports.getOrCreateUser = void 0;
var controller_1 = require("../../database/controller");
function getOrCreateUser(req, res) {
    var _a = req.body, email = _a.email, firebaseId = _a.firebaseId;
    if (!email || !firebaseId)
        return;
    controller_1["default"].selectOne('users', 'firebaseId', firebaseId)
        .then(function (user) {
        if (user)
            return res.send(user);
        var newUser = {
            email: email,
            firebaseId: firebaseId
        };
        controller_1["default"].insertOne('users', ['email', 'firebaseId'], newUser)
            .then(function () {
            controller_1["default"].selectOne('users', 'firebaseId', firebaseId)
                .then(function (user) { return res.send(user); })["catch"](function () { return res.send({}); });
        })["catch"](function () { return res.send({}); });
    })["catch"](function () { return res.send({}); });
}
exports.getOrCreateUser = getOrCreateUser;
