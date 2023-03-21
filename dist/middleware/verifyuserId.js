"use strict";
exports.__esModule = true;
var TOKEN_SECRET = process.env.TOKEN_SECRET;
if (!TOKEN_SECRET) {
    throw new Error('Missing env variable: TOKEN_SECRET');
}
var verifyUserId = function (req, res, next) {
    var decodedToken = res.locals['decodedToken'];
    var user_id = req.params['id'] ? parseInt(req.params['id'], 10) : req.body['id'] || req.body['user_id'];
    if (!decodedToken || !decodedToken.user || decodedToken.user.id !== user_id) {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
};
exports["default"] = verifyUserId;
