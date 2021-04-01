const {CustomError} = require("./custom_error")

class ExistingUser extends CustomError {
    constructor() {
        super("The user already exists");
        this.name = "ExistingUser"
        this.status = 409;
    }

    serialize() {
        return [{ message: this.message }];
    }
}

exports.ExistingUser = ExistingUser;