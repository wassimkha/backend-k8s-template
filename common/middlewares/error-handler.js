const {InvalidCredentials} = require('../errors/invalid_credential');
const {NotAuthenticated} = require('../errors/not_auth');
const {NotFoundError} = require('../errors/not_found');
const {ValidationError} = require('../errors/validation_errors');
const {ExistingUser} = require('../errors/existing_user');
const {CustomError} = require('../errors/custom_error')
const error_handler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).send({errors: err.serialize(), name: err.name})
    }

    res.status(400).send({
        message: "Unexpected error occurred"
    })
};

module.exports = error_handler;