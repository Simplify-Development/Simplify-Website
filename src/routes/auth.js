const router = require('express').Router();
const passport = require('passport');

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.redirect('https://simplify-website.herokuapp.com/dashboard')
});

router.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send(401).send({ msg: 'Unauthorized' })
    }
})

module.exports = router;