const router = require("express").Router();
const auth = require('./auth');
const users = require('./users')
const apps = require('./apps')
const app = require('./newapp')
const appList = require('./appList')

router.use("/auth", auth)
router.use("/users", users)
router.use("/apps", apps)
router.use("/newapp", app)
router.use("/applist", appList)

module.exports = router;