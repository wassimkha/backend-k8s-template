const JsonToken = require('../services/jsontoken');
const {NotAuthenticated} = require('../errors/not_auth');

exports.requireAuth = function (req, res, next) {
    const token = req.headers.token;
    if (!token) {
        const error = new NotAuthenticated()
        throw error;
    }

    res.locals.currentUser = JsonToken.verify(token)

    if (!res.locals.currentUser) {
        const error = new NotAuthenticated()
        throw error;
    }
    next();
};
