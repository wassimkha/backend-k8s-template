const express = require('express');
const axios = require('axios');

const router = express.Router();

get_counter = 0;
router.get('/online', async (req, res) => {
    console.log(`Get request received # ${get_counter} to the payment service`);
    get_counter += 1;
    res.json({online: true, message: 'payment service online 1'});
})

router.get('/user-online', async (req, res) => {
    const data = await axios.post('http://auth-srv:3000/auth/is-user-online', {
        user_id: 'wassim'
    })
    res.json({online: true, response_auth: data.data});
})

module.exports = router;