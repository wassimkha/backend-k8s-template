const express = require('express');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {validateRequest} = require("../common/middlewares/validate-request");
const Password = require("../common/services/password");
const User = require("../common/models/User")
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

        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                email: existingUser.email,
            },
            "key"
        );

        res.setHeader('token', userJwt)
        return res.status(200).send(existingUser);
    }
);

module.exports = router;