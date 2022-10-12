"use strict";
exports.__esModule = true;
exports.toDefaultDateTimeString = void 0;
// Datum fr-CH = DD.MM.YYYY
function toDefaultDateTimeString(datetime) {
    return "".concat(datetime.toLocaleDateString('fr-CH'), " ").concat(datetime.toLocaleTimeString('de-DE'));
}
exports.toDefaultDateTimeString = toDefaultDateTimeString;
