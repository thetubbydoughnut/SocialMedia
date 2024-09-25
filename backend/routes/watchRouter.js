const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Watch Page');
});

module.exports = router;