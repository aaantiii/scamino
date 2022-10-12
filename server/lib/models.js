"use strict";
exports.__esModule = true;
var Scamino;
(function (Scamino) {
    var Country;
    (function (Country) {
        Country["Austria"] = "\u00D6sterreich";
        Country["Germany"] = "Deutschland";
        Country["Switzerland"] = "Schweiz";
    })(Country = Scamino.Country || (Scamino.Country = {}));
    var PaymentMethod;
    (function (PaymentMethod) {
        PaymentMethod["VisaMastercard"] = "Visa | Mastercard";
        PaymentMethod["Paysafe"] = "Paysafe";
        PaymentMethod["Skrill"] = "Skrill";
        PaymentMethod["Neteller"] = "Neteller";
        PaymentMethod["EPS"] = "EPS-\u00DCberweisung";
    })(PaymentMethod = Scamino.PaymentMethod || (Scamino.PaymentMethod = {}));
    var TransactionType;
    (function (TransactionType) {
        TransactionType["Deposit"] = "deposit";
        TransactionType["Withdrawal"] = "withdrawal";
    })(TransactionType = Scamino.TransactionType || (Scamino.TransactionType = {}));
})(Scamino || (Scamino = {}));
exports["default"] = Scamino;
