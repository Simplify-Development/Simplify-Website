const router = require('express').Router();
const schema = require('../database/schemas/User-Schema')

router.get('/', (req, res) => {
    schema.countDocuments({}, function (err, c) {
        count = c;
        res.send(`${count}`)
    })
})

module.exports = router;