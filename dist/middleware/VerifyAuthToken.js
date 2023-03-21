"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TOKEN_SECRET = process.env.TOKEN_SECRET;
if (!TOKEN_SECRET) {
    throw new Error('Missing env variable: TOKEN_SECRET');
}
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error('Could not parse Header');
        }
        var token = authorizationHeader.split(' ')[1];
        var decodedToken = jsonwebtoken_1["default"].verify(token, TOKEN_SECRET);
        if (!decodedToken) {
            throw new Error('Invalid token');
        }
        res.locals['decodedToken'] = decodedToken;
        next();
    }
    catch (e) {
        res.status(401).send("Invalid token ".concat(e));
    }
};
exports["default"] = verifyAuthToken;
