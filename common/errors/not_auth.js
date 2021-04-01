const {CustomError} = require("./custom_error")

class NotAuthenticated extends CustomError {
    constructor() {
        super("The user must be authenticated");
        this.name = "NotAuthenticated"
        this.status = 401;
    }

    serialize() {
        return [{message: this.message}];
    }
}

exports.NotAuthenticated = NotAuthenticated;