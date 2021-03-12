const Crypto = require('crypto-js')

function encrypt(token) {
    return Crypto.AES.encrypt(token, "yeahBoi")
}
function decrypt(token) {
    return Crypto.AES.decrypt(token, "yeahBoi")
}

module.exports = {encrypt, decrypt}