const express = require('express');
const {body} = require('express-validator');
const {validateRequest} = require("../common/middlewares/validate-request");
const Password = require("../common/services/password");
const User = require("../common/models/User")
const JsonToken = require('../common/services/jsontoken');
const {InvalidCredentials} = require("../common/errors/invalid_credential");

const router = express.Router();

router.post('/signin',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a password'),
    ],
    validateRequest,
    async (req, res, next) => {
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if (!existingUser) {
            const error = new InvalidCredentials();
            return next(error);
        }

        const passwordsMatch = await Password.compare(
            existingUser.password,
            password
        );

        if (!passwordsMatch) {
            const error = new InvalidCredentials();
            return next(error);
        }

        const userJwt = JsonToken.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            }
        );

        res.setHeader('token', userJwt)
        return res.status(200).send({user: existingUser});
    }
);

module.exports = router;