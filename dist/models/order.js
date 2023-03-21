"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OrderStore = void 0;
var database_1 = __importDefault(require("../database"));
var OrderStore = /** @class */ (function () {
    function OrderStore() {
    }
    OrderStore.prototype.createOrder = function (user_id, products) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, userSQL, user, createOrderSQL, order_1, addProductSQL_1, productPromises, addedProducts, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, 10, 11]);
                        return [4 /*yield*/, connection.query('BEGIN')];
                    case 3:
                        _a.sent();
                        userSQL = 'SELECT * from users where id=($1);';
                        return [4 /*yield*/, connection.query(userSQL, [user_id])];
                    case 4:
                        user = (_a.sent()).rows[0];
                        if (!user) {
                            throw new Error("Could not find user with id: ".concat(user_id));
                        }
                        createOrderSQL = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
                        return [4 /*yield*/, connection.query(createOrderSQL, ['active', user_id])];
                    case 5:
                        order_1 = (_a.sent()).rows[0];
                        if (!order_1) {
                            throw new Error('Could not create new order');
                        }
                        addProductSQL_1 = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;';
                        productPromises = products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                            var sqlProductValues, createdOrderProduct;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        sqlProductValues = [product.quantity, order_1.id, product.product_id];
                                        return [4 /*yield*/, connection.query(addProductSQL_1, sqlProductValues)];
                                    case 1:
                                        createdOrderProduct = (_a.sent())
                                            .rows[0];
                                        if (!createdOrderProduct) {
                                            throw new Error('Could not add product to order');
                                        }
                                        return [2 /*return*/, createdOrderProduct];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(productPromises)];
                    case 6:
                        addedProducts = _a.sent();
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, addedProducts];
                    case 8:
                        err_1 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 9:
                        _a.sent();
                        throw new Error("Could not create order for user: ".concat(user_id, ". Error: ").concat(err_1));
                    case 10:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getAllOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, orders, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT * FROM orders;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        orders = (_a.sent()).rows;
                        return [2 /*return*/, orders];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("Could not get orders. Error: ".concat(err_2));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getOrder = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, order, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT * FROM orders WHERE id=($1);';
                        return [4 /*yield*/, connection.query(sql, [order_id])];
                    case 3:
                        order = (_a.sent()).rows[0];
                        return [2 /*return*/, order];
                    case 4:
                        err_3 = _a.sent();
                        throw new Error("Could not get order with id: ".concat(order_id, ". Error: ").concat(err_3));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getProductsFromOrder = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, products, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT p.id, name, price, category FROM products p INNER JOIN order_products o ON p.id=o.product_id WHERE o.order_id=($1);';
                        return [4 /*yield*/, connection.query(sql, [order_id])];
                    case 3:
                        products = (_a.sent()).rows;
                        return [2 /*return*/, products];
                    case 4:
                        err_4 = _a.sent();
                        throw new Error("Could not get products for order: ".concat(order_id, ". Error: ").concat(err_4));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.getOrdersByUser = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, orders, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT * FROM orders WHERE user_id=($1);';
                        return [4 /*yield*/, connection.query(sql, [user_id])];
                    case 3:
                        orders = (_a.sent()).rows;
                        return [2 /*return*/, orders];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("Could not get orders for user: ".concat(user_id, ". Error: ").concat(err_5));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.addProductToOrder = function (order_id, orderProduct) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, orderSQL, order, sql, sqlValues, createdOrderProduct, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, 9, 10]);
                        return [4 /*yield*/, connection.query('BEGIN')];
                    case 3:
                        _a.sent();
                        orderSQL = 'SELECT * FROM orders WHERE id=($1);';
                        return [4 /*yield*/, connection.query(orderSQL, [order_id])];
                    case 4:
                        order = (_a.sent()).rows[0];
                        if (!order) {
                            throw new Error('Order does not exist, you may have to create it first');
                        }
                        if (order.status !== 'active') {
                            throw new Error("Order has status ".concat(order.status, ", can not add new products anymore"));
                        }
                        sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *;';
                        sqlValues = [orderProduct.quantity, order_id, orderProduct.product_id];
                        return [4 /*yield*/, connection.query(sql, sqlValues)];
                    case 5:
                        createdOrderProduct = (_a.sent()).rows[0];
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, createdOrderProduct];
                    case 7:
                        err_6 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 8:
                        _a.sent();
                        throw new Error("Could not add product ".concat(orderProduct.product_id, " to order ").concat(order_id, ". Error: ").concat(err_6));
                    case 9:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    OrderStore.prototype.deleteOrder = function (order_id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, orderSQL, order, deleteProductsFromOrdersSQL, deleteOrderSQL, deletedProducts, deletedOrder, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, 10, 11]);
                        return [4 /*yield*/, connection.query('BEGIN')];
                    case 3:
                        _a.sent();
                        orderSQL = 'SELECT * FROM orders WHERE id=($1);';
                        return [4 /*yield*/, connection.query(orderSQL, [order_id])];
                    case 4:
                        order = (_a.sent()).rows[0];
                        if (!order) {
                            throw new Error('Order does not exist, you may have to create it first');
                        }
                        if (order.status !== 'active') {
                            throw new Error("Order has status ".concat(order.status, ", can not delete order anymore"));
                        }
                        deleteProductsFromOrdersSQL = 'DELETE FROM order_products WHERE order_id=($1) RETURNING *;';
                        deleteOrderSQL = 'DELETE FROM orders WHERE id=($1) RETURNING *;';
                        return [4 /*yield*/, connection.query(deleteProductsFromOrdersSQL, [order_id])];
                    case 5:
                        deletedProducts = (_a.sent())
                            .rows;
                        return [4 /*yield*/, connection.query(deleteOrderSQL, [order_id])];
                    case 6:
                        deletedOrder = (_a.sent()).rows[0];
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 7:
                        _a.sent();
                        return [2 /*return*/, {
                                deletedProducts: deletedProducts,
                                deletedOrder: deletedOrder
                            }];
                    case 8:
                        err_7 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 9:
                        _a.sent();
                        throw new Error("Could not delete order ".concat(order_id, ". Error: ").concat(err_7));
                    case 10:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return OrderStore;
}());
exports.OrderStore = OrderStore;
