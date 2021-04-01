const jwt = require('jsonwebtoken');
const {NotAuthenticated} = require('../errors/not_auth');

exports.requireAuth = function (req, res, next) {
    const token = req.headers.token;
    if (!token) {
        const error = new NotAuthenticated()
        throw error;
    }
    try {
        res.locals.currentUser = jwt.verify(token, "key");
    } catch (e) {
        res.locals.currentUser = null;
    }
    if (!res.locals.currentUser) {
        const error = new NotAuthenticated()
        throw error;
    }
    next();
};
