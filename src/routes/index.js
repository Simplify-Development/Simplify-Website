const router = require("express").Router();
const auth = require('./auth');
const users = require('./users')
const apps = require('./apps')

router.use("/auth", auth)
router.use("/users", users)
router.use("/apps", apps)

module.exports = router;