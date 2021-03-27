const router = require('express').Router();
const { getApplicationRole } = require('../utils/utils')

router.get('/', (req, res) => {
    getApplicationRole().then(data => res.send(data))
})

module.exports = router;