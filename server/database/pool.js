"use strict";
exports.__esModule = true;
var mysql2_1 = require("mysql2");
var game_list_1 = require("../routes/casino/games/game-list");
// Objekt als Parameter statt Array verwenden
// https://github.com/mysqljs/mysql#custom-format
function objectParamsFormat(query, params) {
    if (!params)
        return query;
    return query.replace(/\:(\w+)/g, function (paramName, key) {
        if (params.hasOwnProperty(key))
            return this.escape(params[key]);
        return paramName;
    }.bind(this));
}
// Bei mysql2 wird type NEWDECIMAL immer als String zurückgegeben
// --> wird in dieser Funktion wieder in Number umgewandelt
function castNewDecimal(field, next) {
    if (field.type === 'NEWDECIMAL') {
        var value = field.string();
        return value !== null && value !== void 0 ? value : Number(value);
    }
    return next();
}
var pool = (0, mysql2_1.createPool)({
    queryFormat: objectParamsFormat,
    typeCast: castNewDecimal,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT)
});
var defaultPrefix = "MySQL Datenbank auf Port ".concat(process.env.DB_PORT);
var retryStepsInSeconds = [15, 30, 60, 120];
var retryIndex = 0;
function testPoolConnection() {
    pool.getConnection(function (conErr, con) {
        var _a;
        if (conErr) {
            var timeoutInSeconds = (_a = retryStepsInSeconds[retryIndex++]) !== null && _a !== void 0 ? _a : retryStepsInSeconds.slice(-1)[0];
            console.log("".concat(defaultPrefix, " nicht erreichbar. Wird in ").concat(timeoutInSeconds, " Sekunden erneut versucht..."));
            return setTimeout(testPoolConnection, timeoutInSeconds * 1000);
        }
        con.release();
        (0, game_list_1.refreshGameList)();
        console.log("".concat(defaultPrefix, " erreichbar."));
    });
}
testPoolConnection();
exports["default"] = pool;
