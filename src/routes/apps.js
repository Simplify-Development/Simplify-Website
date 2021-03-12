const router = require('express').Router();
const totalSchema = require('../database/schemas/total-schema');
const appDB = require('../database/schemas/App-Schema')

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

router.get('/:appId', async (req, res) => {
    const { appId } = req.params;
    await appDB.findOne({ applicationId: appId }, (err, data) => {
        if (err) res.status(400).send({ msg: 'Application not found' })
        
        if (data) {
            res.send(data)
        } else res.status(400).send({ msg: 'Application not found' })
    })
})

router.get('/check/:userId', async (req, res) => {
    const { userId } = req.params;
    await appDB.findOne({ discordId: userId }, (err, data) => {
        if (data) {
            res.send(data)
        } else if (!data) res.send({ msg: 'Already a application!' })
    })
})

module.exports = router;