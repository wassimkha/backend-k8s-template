const express = require('express');

const router = express.Router();
get_counter = 0;
router.get('/online', async (req, res) => {
    console.log(`Get request received # ${get_counter}`);
    get_counter += 1;
    res.json({online: true});
})

module.exports = router;