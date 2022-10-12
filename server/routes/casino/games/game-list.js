"use strict";
exports.__esModule = true;
exports.getGames = exports.refreshGameList = void 0;
var controller_1 = require("../../../database/controller");
var games = [];
function refreshGameList() {
    controller_1["default"].selectSpecificJoinLeft('games', 'provider', 'providerId', 'id', ['games.name', 'games.image', 'provider.name as providerName'])
        .then(function (data) { return games = data; })["catch"](function () { return console.warn('Spiele konnten nicht aus der Datenbank geladen werden.'); });
}
exports.refreshGameList = refreshGameList;
var getGames = function (req, res) { return res.send(games); };
exports.getGames = getGames;
// alle refreshTimeInMinutes Minuten wird die Spieleliste neu aus der DB geladen
var refreshTimeInMinutes = 10;
setInterval(refreshGameList, refreshTimeInMinutes * 60 * 1000);
