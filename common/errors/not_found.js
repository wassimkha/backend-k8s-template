const {CustomError} = require("./custom_error")

class NotFoundError extends CustomError {
    constructor() {
        super("Route Not Found");
        this.name = "NotFoundError"
        this.status = 400;
    }

    serialize() {
        return [{message: this.message}];
    }
}

exports.NotFoundError = NotFoundError;