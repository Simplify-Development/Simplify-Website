const router = require('express').Router();
const passport = require('passport');
const { getServerUsers } = require('../utils/utils')

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('https://simplify-code.com/dashboard')
});

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send(401).send({ msg: 'Unauthorized' })
    }
})

module.exports = router;