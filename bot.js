require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-'
const token = process.env.token;

function bot() {
    const guild = client.guilds.cache.get("756195742741430352")
    const category = guild.channels.cache.get("815570778833289217")

    guild.channels.create(`${new Date()}`, {
        type: "text",
        parent: category.id,
        topic: `A currently open application!`,
        permissionOverwrites: [
            {
                id: '756195742741430352', // Everyone role
                deny: ["VIEW_CHANNEL"]
            },
            {
                id: '810473298135482388', // Management Role
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_MESSAGES"]
            }
        ]
    })

    client.login(token);
}

module.exports = bot();