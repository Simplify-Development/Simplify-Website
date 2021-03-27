const router = require('express').Router();
const { getApplicationRole } = require('../utils/utils')

router.get('/:userId', (req, res) => {
    const { userId } = req.params
    getApplicationRole(userId).then(data => {
        if (data.roles.includes("825434877133848636")) {
            res.send({ message: "Yes" })
        } else {
            res.send({ message: "No" })
        }
    }).catch(err => res.send(err))
})

module.exports = router;