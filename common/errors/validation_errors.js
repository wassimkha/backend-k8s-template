const {CustomError} = require("./custom_error")

class ValidationError extends CustomError {
    constructor(errors) {
        super("The user must be authenticated");
        this.name = "ValidationError"
        this.status = 400;
        this.reasons = errors;
    }

    serialize() {
        return [{message: this.message, reasons: this.reasons}];
    }
}

exports.ValidationError = ValidationError;