const Discord = require('discord.js')
const warns = require('../../database/schemas/warns')
const autoWarns = require('../../database/schemas/auto warns')
const moment = require('moment')

/**
 * 
 * @param {Discord.Client} client 
 */

module.exports = async (client, req, res) => {
    const { id } = req.params
    const guild = client.guilds.cache.get("756195742741430352")
    const member = guild.members.cache.get(id)

    if (member) {
        const warnsData = await warns.find({ userID: id })
        const autoWarnsData = await autoWarns.find({ userId: id })
        res.send(
            {
                userData: {
                    username: member.user.username,
                    id: member.user.id,
                    avatar: member.user.displayAvatarURL({ format: 'png' }),
                    created: `${moment(member.user.createdAt).format('LT')} ${moment(member.user.createdAt).format('LL')} ${moment(member.user.createdAt).fromNow()}`,
                    joined: `${moment(member.joinedAt).format('LT')} ${moment(member.joinedAt).format('LL')} ${moment(member.joinedAt).fromNow()}`
                },
                autoWarnsData: autoWarnsData,
                warnsData: warnsData
            }
            
        )
    }
    else res.status(404).send({ error: "Not a Member" })
}