const {validationResult} = require('express-validator');


exports.validateRequest = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error =  new Error("this is an error");
        error.status = 400;
        error.reasons = errors.array();
        throw error;

    }
    next();
};
