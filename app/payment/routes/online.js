const express = require('express');
const {axios_instance} = require('../common/axios/internal-requests')
const router = express.Router();

get_counter = 0;
router.get('/online', async (req, res) => {
    console.log(`Get request received # ${get_counter} to the payment service`);
    get_counter += 1;
    res.json({online: true, message: 'payment service is online'});
})

router.get('/user-online', async (req, res) => {
    const data = await axios_instance.post('/auth/is-user-online', {
        user_id: '1234'
    })
    res.json({online: true, response_auth: data.data});
})

module.exports = router;