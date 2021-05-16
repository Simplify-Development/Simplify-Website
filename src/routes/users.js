const router = require('express').Router();
const schema = require('../database/schemas/User-Schema')
const { getServerUsers } = require('../utils/utils')

router.get('/', (req, res) => {
    /*schema.countDocuments({}, function (err, c) {
        count = c;
        res.send(`${count}`)
    })*/

    getServerUsers().then(data => {
        res.send(data)
    })
})

module.exports = router;