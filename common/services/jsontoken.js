const {randomBytes} = require("crypto");
const jwt = require('jsonwebtoken');

class JsonToken {
    static sign(payload) {
        const key = randomBytes(8).toString('hex');
        const userJwt = jwt.sign(
            payload,
            key,
            { expiresIn: '7 days' }
        );
        return `${userJwt}.${key}`;
    }

    static verify(token) {
        const [header, payload, signature, key] = token.split('.');
        try {
            return jwt.verify(`${header}.${payload}.${signature}`, key);
        } catch (e) {
            return null
        }
    }
}

module.exports = JsonToken;