"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var pool_1 = require("./pool");
var Controller = /** @class */ (function () {
    function Controller() {
    }
    /**
     * Fügt einen Datensatz in die entsprechende Tabelle ein.
     * @param table Name der Tabelle in welche der Datensatz eingefügt wird
     * @param insertColumns Name der Datenbank Attribute in welche die Werte eingefügt werden
     * @param insertObject Einzufügender Datensatz vom generischen Typ T
     */
    Controller.insertOne = function (table, insertColumns, insertObject) {
        return new Promise(function (resolve, reject) {
            pool_1["default"].getConnection(function (conErr, con) {
                if (conErr)
                    return reject(conErr);
                var insertValues = insertColumns.map(function (key) { return insertObject[key]; });
                con.query("INSERT INTO ".concat(table, " (").concat(insertColumns, ") VALUES (:insertValues);"), { insertValues: insertValues }, function (err) {
                    if (err)
                        reject(err);
                    resolve();
                    con.release();
                });
            });
        });
    };
    /**
     * Erstellt eine Geldtransaktion oder eine Roulette Wette.
     * @param table
     * @param insertColumns
     * @param data
     * @param balanceChangeAmount
     * @returns
     */
    Controller.startTransaction = function (table, insertColumns, data, balanceChangeAmount) {
        return new Promise(function (resolve, reject) {
            pool_1["default"].getConnection(function (conErr, con) {
                if (conErr)
                    return reject(conErr);
                con.beginTransaction(function (transactionErr) {
                    if (transactionErr)
                        return con.rollback(function () { return reject(transactionErr); });
                    var insertValues = insertColumns.map(function (key) { return data[key]; });
                    con.query("INSERT INTO ".concat(table, " (").concat(insertColumns, ") VALUES (:insertValues);"), { insertValues: insertValues }, function (insertErr) {
                        if (insertErr)
                            return con.rollback(function () { return reject(insertErr); });
                        con.query('UPDATE users SET balance = balance + :balanceChangeAmount WHERE id = :userId;', __assign({ balanceChangeAmount: balanceChangeAmount }, data), function (updateErr) {
                            if (updateErr)
                                return con.rollback(function () {
                                    reject(updateErr);
                                    con.release();
                                });
                            con.commit(function (commitErr) {
                                if (commitErr)
                                    return con.rollback(function () {
                                        reject(commitErr);
                                        con.release();
                                    });
                                con.release();
                                resolve();
                            });
                        });
                    });
                });
            });
        });
    };
    /**
     * Gibt einen einzigen Datensatz aus der entsprechenden Tabelle zurück
     * @param table
     * @param keyName
     * @param keyValue
     * @returns
     */
    Controller.selectOne = function (table, keyName, keyValue) {
        return new Promise(function (resolve, reject) {
            pool_1["default"].getConnection(function (conErr, con) {
                if (conErr)
                    return reject(conErr);
                con.query("SELECT * FROM ".concat(table, " WHERE ").concat(keyName, " = :keyValue;"), { keyValue: keyValue }, function (err, data) {
                    if (err)
                        reject(err);
                    con.release();
                    resolve(data[0]);
                });
            });
        });
    };
    /**
     * Selektiert alle Zeilen bei welchen die Spalte keyName den Wert keyValue hat
     * @param table Name der Tabelle aus welcher selektiert werden soll
     * @param keyName Spaltenname der WHERE Condition
     * @param keyValue Wert von keyName
     * @param orderColumnName Spaltenname der zum Sortieren des Ergebnis verwendet werden soll
     * @param order ASC | DESC
     * @returns Eine Array vom Typ T
     */
    Controller.selectAllWhere = function (table, keyName, keyValue, orderColumnName, order) {
        return new Promise(function (resolve, reject) {
            pool_1["default"].getConnection(function (conErr, con) {
                if (conErr)
                    return reject(conErr);
                con.query("SELECT * FROM ".concat(table, " WHERE ").concat(keyName, " = :keyValue ORDER BY ").concat(orderColumnName, " ").concat(order, ";"), { keyValue: keyValue }, function (err, data) {
                    if (err)
                        reject(err);
                    con.release();
                    resolve(data);
                });
            });
        });
    };
    /**
     * Left joined zwei Tabellen miteinander
     * @param leftTable Die linke Tabelle des Joins
     * @param rightTable Die rechte Tabelle des Joins
     * @param leftKeyName Der (Fremd-)Schlüssel der linken Tabelle
     * @param rightKeyName Der (Fremd-)Schlüssel der rechten Tabelle
     * @param selectedColumns Array der Spaltennamen welche von den jeweiligen Tabellen selektiert werden sollen
     * @returns Eine Array vom Typ T
     */
    Controller.selectSpecificJoinLeft = function (leftTable, rightTable, leftKeyName, rightKeyName, selectedColumns) {
        return new Promise(function (resolve, reject) {
            pool_1["default"].getConnection(function (conErr, con) {
                if (conErr)
                    return reject(conErr);
                con.query("SELECT ".concat(selectedColumns, " FROM ").concat(leftTable, " LEFT JOIN ").concat(rightTable, " ON ").concat(leftTable, ".").concat(leftKeyName, " = ").concat(rightTable, ".").concat(rightKeyName, ";"), function (mysqlErr, data) {
                    if (mysqlErr)
                        reject(mysqlErr);
                    con.release();
                    resolve(data);
                });
            });
        });
    };
    /**
     * Funktion um eine Zeile in einer Tabelle zu verändern
     * @param table Tabellenname der zu ändernden Tabelle
     * @param updatedColumns Spaltennamen der zu verändernden Werte
     * @param data Werte der zu verändernden Spalten als Objekt
     */
    Controller.updateOne = function (table, keyName, updatedColumns, data) {
        return new Promise(function (resolve, reject) {
            pool_1["default"].getConnection(function (conErr, con) {
                if (conErr)
                    return reject(conErr);
                var updatedColumnsWithParams = updatedColumns.map(function (column) { return "".concat(column, " = :").concat(column); });
                var sql = "UPDATE ".concat(table, " SET ").concat(updatedColumnsWithParams, " WHERE ").concat(keyName, " = :").concat(keyName, ";");
                con.query(sql, data, function (err) {
                    if (err)
                        reject(err);
                    con.release();
                    resolve();
                });
            });
        });
    };
    return Controller;
}());
exports["default"] = Controller;
