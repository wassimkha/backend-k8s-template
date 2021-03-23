const express = require('express');
const {send_internal_request} = require('../common/axios/internal-requests')
const router = express.Router();

get_counter = 0;
router.get('/online', async (req, res) => {
    console.log(`Get request received # ${get_counter} to the payment service`);
    get_counter += 1;
    res.json({online: true, message: 'payment service online'});
})

router.get('/user-online', async (req, res) => {
    const instance = await send_internal_request();
    const data = await instance.post('/auth/is-user-online', {
        user_id: '1234'
    })
    res.json({online: true, response_auth: data.data});
})

module.exports = router;