const express = require('express');
const {requireAuth} = require("../common/middlewares/require-auth")

const router = express.Router();

router.post('/currentuser', requireAuth, async (req, res) => {
        res.send({user: res.locals.currentUser});
    }
);

module.exports = router;