const fetch = require("node-fetch");

async function getApplicationRole(discordId) {

    const response = await fetch(`https://discordapp.com/api/guilds/756195742741430352/members/${discordId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${process.env.token}`
        }
    })
    return response.json();
}

module.exports = { getApplicationRole };