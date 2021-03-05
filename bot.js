require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '-'
const token = process.env.token;

client.on('ready', () => {
    console.log('Bot is ready')
})

client.on('message', async message => {
    if (message.content.toLowerCase() === `${prefix}dev`) {
        message.reply('Testing Complete')
    }
})

client.login(token);