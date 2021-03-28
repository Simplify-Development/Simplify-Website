const router = require('express').Router();
const schema = require('../database/schemas/App-Schema')

router.get('/:userId', (req, res) => {
    const { userId } = req.params
    schema.find({ discordId: userId }, (err, users) =>
        res.send(users)
    )
})

module.exports = router;