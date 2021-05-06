const Discord = require('discord.js')

/**
 * 
 * @param {Discord.Client} client 
 */

module.exports = async (client, req, res) => {
    const guild = client.guilds.cache.get("756195742741430352")
    const result = guild.members.cache.filter(member => member.user.bot == false)
    const users = []

    result.forEach(async member => {
        users.push({
            name: member.user.username,
            id: member.user.id,
            avatar: member.user.displayAvatarURL({ format: 'png' })
        })
    })
    res.send(users)
}