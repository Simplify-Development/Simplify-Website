const router = require("express").Router();
const auth = require('./auth');
const users = require('./users')
const apps = require('./apps')
const app = require('./newapp')
const appList = require('./appList')
const checkPerms = require('./checkPerms')
const userApps = require('./userApps')

router.use("/auth", auth)
router.use("/users", users)
router.use("/apps", apps)
router.use("/applist", appList)
router.use("/userapps", userApps)
router.use("/checkperms", checkPerms)

module.exports = router;