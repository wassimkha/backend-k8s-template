const express = require('express');
const {body, validationResult} = require('express-validator');
const JsonToken = require('../common/services/jsontoken');
const {validateRequest} = require("../common/middlewares/validate-request");
const User = require("../common/models/User")
const {ExistingUser} = require("../common/errors/existing_user");

const router = express.Router();

router.post('/signup', [
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
        if (existingUser) {
            const error = new ExistingUser();
            return next(error);
        }

        const user = new User({
            email,
            password
        });
        await user.save();

        const userJwt = JsonToken.sign(
            {
                id: user.id,
                email: user.email,
            }
        );

        res.setHeader('token', userJwt)
        return res.status(200).send({user});
    }
);

module.exports = router;