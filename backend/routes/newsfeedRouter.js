const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('News Feed Page');
});

module.exports = router;