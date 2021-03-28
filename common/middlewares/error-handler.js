const error_handler = (err, req, res, next) => {
    res.status(err.status).send({
        message: err.message,
        errors: err.reasons
    })
};

module.exports = error_handler;