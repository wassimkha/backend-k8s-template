const express = require('express');
const axios = require('axios');

const router = express.Router();

get_counter = 0;
router.get('/online', async (req, res) => {
    console.log(`Get request received # ${get_counter} to the payment service`);
    get_counter += 1;
    res.json({online: true, message: 'payment service online'});
})

router.get('/user-online', async (req, res) => {
    const data = await axios.post('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/auth/is-user-online', {
        user_id: 'wassim'
    }, {
        headers: {
            'Host': `backend.com`
        }}
    )
    res.json({online: true, response_auth: data.data});
})

module.exports = router;