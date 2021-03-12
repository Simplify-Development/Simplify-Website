const router = require('express').Router();
const schema = require('../database/schemas/App-Schema')

router.get('/', (req, res) => {
    schema.find({}, (err, users) =>
        res.send(users)
    )
})

module.exports = router;