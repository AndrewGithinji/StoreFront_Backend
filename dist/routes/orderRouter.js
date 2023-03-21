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
var order_1 = require("./../models/order");
var express_1 = __importDefault(require("express"));
var VerifyAuthToken_1 = __importDefault(require("../middleware/VerifyAuthToken"));
var orderStore = new order_1.OrderStore();
var orderRouter = express_1["default"].Router();
// Handler
var addProductToOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderProduct, order_id, createdOrderProduct, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderProduct = req.body;
                order_id = parseInt(req.params['id'], 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.addProductToOrder(order_id, orderProduct)];
            case 2:
                createdOrderProduct = _a.sent();
                if (!createdOrderProduct) {
                    throw new Error('Could not add product to order');
                }
                res.status(201).json(createdOrderProduct);
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.status(500).send(e_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var createOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, products, orderProducts, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.body.user_id;
                products = req.body.products;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!user_id || !products || !products.length) {
                    throw new Error('Invalid request. Please provide a user_id and a products array');
                }
                return [4 /*yield*/, orderStore.createOrder(user_id, products)];
            case 2:
                orderProducts = _a.sent();
                if (!orderProducts) {
                    throw new Error('Could not create order');
                }
                res.status(201).json(orderProducts);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.status(500).send(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getAllOrders = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.getAllOrders()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).send(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, order, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = parseInt(req.params['id'], 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.getOrder(order_id)];
            case 2:
                order = _a.sent();
                if (!order) {
                    res.status(404).send("Could not find order ".concat(order_id));
                    return [2 /*return*/];
                }
                res.json(order);
                return [3 /*break*/, 4];
            case 3:
                e_4 = _a.sent();
                res.status(500).send(e_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getProductsFromOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, products, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = parseInt(req.params['id'], 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.getProductsFromOrder(order_id)];
            case 2:
                products = _a.sent();
                if (!products || !products.length) {
                    res.status(404).send("Could not find products for order ".concat(order_id));
                    return [2 /*return*/];
                }
                res.json(products);
                return [3 /*break*/, 4];
            case 3:
                e_5 = _a.sent();
                res.status(500).send(e_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getOrdersByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, orders, e_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = parseInt(req.params['id'], 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.getOrdersByUser(user_id)];
            case 2:
                orders = _a.sent();
                if (!orders || !orders.length) {
                    res.status(404).send("Could not find orders for user ".concat(user_id));
                    return [2 /*return*/];
                }
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                e_6 = _a.sent();
                res.status(500).send(e_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, deletedOrder, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = parseInt(req.params['id'], 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.deleteOrder(order_id)];
            case 2:
                deletedOrder = _a.sent();
                res.json(deletedOrder);
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                res.status(500).send(e_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Routes
orderRouter.post('/:id/product', VerifyAuthToken_1["default"], addProductToOrder);
orderRouter.post('/', VerifyAuthToken_1["default"], createOrder);
orderRouter.get('/:id', VerifyAuthToken_1["default"], getOrder);
orderRouter.get('/:id/products', VerifyAuthToken_1["default"], getProductsFromOrder);
orderRouter.get('/', VerifyAuthToken_1["default"], getAllOrders);
orderRouter.get('/ordersByUser/:id', VerifyAuthToken_1["default"], getOrdersByUser);
orderRouter["delete"]('/:id', VerifyAuthToken_1["default"], deleteOrder);
exports["default"] = orderRouter;
