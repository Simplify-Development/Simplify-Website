const router = require('express').Router();
const totalSchema = require('../database/schemas/total-schema');

router.get('/', (req, res) => {
    totalSchema.findOne({ id: 756195742741430352 }, (err, data) => {
        if (err) console.log("error")

        if (data) {
            res.send(`${data.total}`)
        } else if (!data) {
            console.log('Could not find that module')
        }
    })
})

module.exports = router;