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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserStore = void 0;
var database_1 = __importDefault(require("../database"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var _a = process.env, BCRYPT_PASSWORD = _a.BCRYPT_PASSWORD, SALT_ROUNDS = _a.SALT_ROUNDS;
var UserStore = /** @class */ (function () {
    function UserStore() {
    }
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, users, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT * FROM users;';
                        return [4 /*yield*/, connection.query(sql)];
                    case 3:
                        users = (_a.sent()).rows;
                        return [2 /*return*/, users.map(function (_a) {
                                var password = _a.password, rest = __rest(_a, ["password"]);
                                return rest;
                            })];
                    case 4:
                        err_1 = _a.sent();
                        throw new Error("Cannot get users ".concat(err_1));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, sqlValues, users, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT * FROM users WHERE id=($1);';
                        sqlValues = [id];
                        return [4 /*yield*/, connection.query(sql, sqlValues)];
                    case 3:
                        users = (_a.sent()).rows;
                        return [2 /*return*/, users.map(function (_a) {
                                var password = _a.password, rest = __rest(_a, ["password"]);
                                return rest;
                            })[0]];
                    case 4:
                        err_2 = _a.sent();
                        throw new Error("Could not find user with id ".concat(id, ". Error: ").concat(err_2));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, exitsingUserSQL, sql, existingUser, hash, sqlValues, createdUser, err_3;
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
                        exitsingUserSQL = 'SELECT * from users where email=($1);';
                        sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *;';
                        if (!BCRYPT_PASSWORD) {
                            throw new Error('Missing env variable: BCRYPT_PASSWORD');
                        }
                        if (!SALT_ROUNDS) {
                            throw new Error('Missing env variable: SALT_ROUNDS');
                        }
                        if (!user.first_name || !user.last_name || !user.email || !user.password) {
                            throw new Error('Missing user properties');
                        }
                        return [4 /*yield*/, connection.query(exitsingUserSQL, [user.email])];
                    case 4:
                        existingUser = (_a.sent()).rows[0];
                        if (existingUser) {
                            return [2 /*return*/, existingUser];
                        }
                        hash = bcrypt_1["default"].hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                        sqlValues = [user.first_name, user.last_name, user.email, hash];
                        return [4 /*yield*/, connection.query(sql, sqlValues)];
                    case 5:
                        createdUser = (_a.sent()).rows[0];
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, createdUser];
                    case 7:
                        err_3 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 8:
                        _a.sent();
                        throw new Error("Could not create new user: ".concat(user.first_name, " ").concat(user.last_name, ". Error: ").concat(err_3));
                    case 9:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.update = function (user_id, user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, hash, sqlValues, updatedUser, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, 8, 9]);
                        return [4 /*yield*/, connection.query('BEGIN')];
                    case 3:
                        _a.sent();
                        sql = user.password
                            ? 'UPDATE users SET first_name=($1), last_name=($2), email=($3), password=($4) WHERE id=($5) RETURNING *;'
                            : 'UPDATE users SET first_name=($1), last_name=($2), email=($3) WHERE id=($4) RETURNING *;';
                        if (!BCRYPT_PASSWORD) {
                            throw new Error('Missing env variable: BCRYPT_PASSWORD');
                        }
                        if (!SALT_ROUNDS) {
                            throw new Error('Missing env variable: SALT_ROUNDS');
                        }
                        if (!user.first_name || !user.last_name || !user.email) {
                            throw new Error('Missing user properties');
                        }
                        hash = bcrypt_1["default"].hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
                        sqlValues = user.password
                            ? [user.first_name, user.last_name, user.email, hash, user_id]
                            : [user.first_name, user.last_name, user.email, user_id];
                        return [4 /*yield*/, connection.query(sql, sqlValues)];
                    case 4:
                        updatedUser = (_a.sent()).rows[0];
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, updatedUser];
                    case 6:
                        err_4 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 7:
                        _a.sent();
                        throw new Error("Could not update user ".concat(user.email, ". Error: ").concat(err_4));
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, sqlValues, deletedUser, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, 8, 9]);
                        return [4 /*yield*/, connection.query('BEGIN')];
                    case 3:
                        _a.sent();
                        sql = 'DELETE FROM users WHERE id=($1);';
                        sqlValues = [id];
                        return [4 /*yield*/, connection.query(sql, sqlValues)];
                    case 4:
                        deletedUser = (_a.sent()).rows[0];
                        return [4 /*yield*/, connection.query('COMMIT')];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, deletedUser];
                    case 6:
                        err_5 = _a.sent();
                        return [4 /*yield*/, connection.query('ROLLBACK')];
                    case 7:
                        _a.sent();
                        throw new Error("Could not delete user with id ".concat(id, ". Error: ").concat(err_5));
                    case 8:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, sqlValues, user, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, 5, 6]);
                        sql = 'SELECT * FROM users where email=($1);';
                        sqlValues = [email];
                        return [4 /*yield*/, connection.query(sql, sqlValues)];
                    case 3:
                        user = (_a.sent()).rows[0];
                        if (!user) {
                            throw new Error('Could not find user');
                        }
                        if (bcrypt_1["default"].compareSync(password + BCRYPT_PASSWORD, user.password || '')) {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                    case 4:
                        err_6 = _a.sent();
                        throw new Error("Cannot authenticate user ".concat(err_6));
                    case 5:
                        connection.release();
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.UserStore = UserStore;
