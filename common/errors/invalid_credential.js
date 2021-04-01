const {CustomError} = require("./custom_error")

class InvalidCredentials extends CustomError {
    constructor() {
        super("Invalid Credentials");
        this.name = "InvalidCredentials"
        this.status = 401;
    }

    serialize() {
        return [{ message: this.message }];
    }
}

exports.InvalidCredentials = InvalidCredentials;