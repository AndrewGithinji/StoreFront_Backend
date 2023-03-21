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
var express_1 = __importDefault(require("express"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var VerifyAuthToken_1 = __importDefault(require("../middleware/VerifyAuthToken"));
var verifyuserId_1 = __importDefault(require("../middleware/verifyuserId"));
var user_1 = require("./../models/user");
var userStore = new user_1.UserStore();
var userRouter = express_1["default"].Router();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
// Handler
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userStore.index()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).send(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        try {
            user = userStore.show(parseInt(req.params['id']));
            if (user !== undefined) {
                res.status(200).json(user);
            }
            else {
                res.status(404).send('User not found.');
            }
        }
        catch (e) {
            res.status(500).send(e);
        }
        return [2 /*return*/];
    });
}); };
var addDemoUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@test.com',
                    password: process.env['DEMO_USER_PASSWORD']
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!process.env['TOKEN_SECRET']) {
                    throw new Error('Missing env variable: TOKEN_SECRET');
                }
                if (!process.env['DEMO_USER_PASSWORD']) {
                    throw new Error('Missing env variable: DEMO_USER_PASSWORD');
                }
                return [4 /*yield*/, userStore.create(user)];
            case 2:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({
                    user: {
                        id: newUser.id,
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        email: newUser.email
                    }
                }, process.env['TOKEN_SECRET']);
                res.status(201).json(token);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                res.status(500).send(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var addUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, newUser, token, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                if (!TOKEN_SECRET) {
                    throw new Error('Missing env variable: TOKEN_SECRET');
                }
                user = req.body;
                return [4 /*yield*/, userStore.create(user)];
            case 1:
                newUser = _a.sent();
                token = jsonwebtoken_1["default"].sign({
                    user: {
                        id: newUser.id,
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        email: newUser.email
                    }
                }, TOKEN_SECRET);
                res.status(201).json(token);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.status(500).send(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, user_id, updatedUser, token, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.body;
                user_id = parseInt(req.params['id'], 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                if (!TOKEN_SECRET)
                    throw new Error('Missing env variable: TOKEN_SECRET');
                return [4 /*yield*/, userStore.update(user_id, user)];
            case 2:
                updatedUser = _a.sent();
                if (!updatedUser)
                    return [2 /*return*/, res.status(404).send('User not found.')];
                token = jsonwebtoken_1["default"].sign({ user: updatedUser }, TOKEN_SECRET);
                return [2 /*return*/, res.status(200).send(token)];
            case 3:
                e_4 = _a.sent();
                return [2 /*return*/, res.status(500).send(e_4)];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, deletedUser, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user_id = parseInt(req.params['id'], 10);
                return [4 /*yield*/, userStore["delete"](user_id)];
            case 1:
                deletedUser = _a.sent();
                res.status(200).json(deletedUser);
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                res.status(500).send(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var authenticateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, authUser, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                if (!TOKEN_SECRET) {
                    res.status(500).send('Missing env variable: TOKEN_SECRET');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, userStore.authenticate(email, password)];
            case 1:
                authUser = _a.sent();
                if (!authUser) {
                    res.status(401).send('Could not authenticate user. Wrong credentials');
                    return [2 /*return*/];
                }
                token = jsonwebtoken_1["default"].sign({
                    user: {
                        id: authUser.id,
                        first_name: authUser.first_name,
                        last_name: authUser.last_name,
                        email: authUser.email
                    }
                }, TOKEN_SECRET);
                res.status(200).json(token);
                return [2 /*return*/];
        }
    });
}); };
// Routes
userRouter.get('/', VerifyAuthToken_1["default"], getAllUsers);
userRouter.get('/:id', VerifyAuthToken_1["default"], getUser);
userRouter.post('/login', authenticateUser);
userRouter.post('/demoUser', addDemoUser);
userRouter.post('/', VerifyAuthToken_1["default"], addUser);
userRouter.put('/:id', [VerifyAuthToken_1["default"], verifyuserId_1["default"]], updateUser);
userRouter["delete"]('/:id', [VerifyAuthToken_1["default"], verifyuserId_1["default"]], deleteUser);
exports["default"] = userRouter;
