const fetch = require("node-fetch");
const CryptoJS = require('crypto-js')
const OAuth2 = require('../database/schemas/OAuth2Credentials');
const { decrypt } = require('./api')

async function getApplicationRole(discordId) {
    const credentials = await OAuth2.findOne({ discordId })
    if (!credentials) throw new Error("No credentials.");
    const encryptedAccessToken = credentials.get('accessToken');
    const decrypted = decrypt(encryptedAccessToken);
    const accessToken = decrypted.toString(CryptoJS.enc.Utf8)

    const response = await fetch(`https://discordapp.com/api/users/@me/guilds/756195742741430352/roles`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    return response.json();
}

module.exports = { getApplicationRole };