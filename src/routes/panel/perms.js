const Discord = require('discord.js')

/**
 * 
 * @param {Discord.Client} client 
 */

module.exports = async (client, req, res) => {
    const { id } = req.params;
    const guild = client.guilds.cache.get("756195742741430352");
    const role = guild.roles.cache.get("756606234706051072")
    const member = guild.members.cache.get(id)

    if (!member) {
        res.send({ response: "No" })
    } else if (member) {
        if (member.roles.highest.position >= role.position) {
            res.send({ response: "Yes" })
        } else {
            res.send({ response: "No" })
        }
    }
}