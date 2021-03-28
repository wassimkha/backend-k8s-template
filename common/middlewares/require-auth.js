const jwt = require('jsonwebtoken');

exports.requireAuth = function (req, res, next) {
    const token = req.headers.token;
    if (!token) {
        const error =  new Error("No token");
        error.status = 401;
        throw error;
    }
    try {
        res.locals.currentUser = jwt.verify(token, "key");
    } catch (e) {
        res.locals.currentUser = null;
    }
    if (!res.locals.currentUser) {
        const error =  new Error("Not authorized");
        error.status = 401;
        throw error;
    }
    next();
};
