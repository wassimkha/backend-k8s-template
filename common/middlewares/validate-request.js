const {validationResult} = require('express-validator');

const {ValidationError} = require('../errors/validation_errors');


exports.validateRequest = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new ValidationError(errors.array())
        throw error;

    }
    next();
};
