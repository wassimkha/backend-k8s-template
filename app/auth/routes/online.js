const express = require('express');

const router = express.Router();
get_counter = 0;
router.get('/online', async (req, res) => {
    console.log(`Get request received # ${get_counter} to the auth service`);
    get_counter += 1;
    res.json({online: true, message: 'auth service online'});
})

router.post('/is-user-online', async (req, res) => {
    const user_id = req.body.user_id
    res.json({message: `the user ${user_id} is online`, is_online: true})
})

module.exports = router;