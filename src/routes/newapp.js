const router = require('express').Router();
const schema = require('../database/schemas/App-Schema')
const totalSchema = require('../database/schemas/total-schema')
const random = require('randomstring')
const dateFormat = require("dateformat")
const now = new Date();
const { client } = require('../../server')


router.route("/").post(async (req, res) => {
    const content = req.body.app
    const reqs = req.body.reqs
    const discordId = req.body.id
    const user = req.body.user
    const tag = req.body.tag
    let applicationId = random.generate(6)

    res.send("test")

    const newData = new schema({
        appType: req.body.appType,
        user,
        content,
        reqs,
        discordId,
        applicationId,
        tag,
        date: dateFormat(now, "mm/dd/yyyy"),
        status: 'Pending'
    })
    newData.save().then(() => {
        client.users.cache.get(discordId).send(`Hello <@${discordId}>, Your \`\`${req.body.appType}\`\` has been submitted.`)
    })

    await totalSchema.findOneAndUpdate({
        id: "756195742741430400"
    }, {
        $inc: {
            total: 1
        }
    }, {
        upsert: true,
        new: true
    })
})


module.exports = router;