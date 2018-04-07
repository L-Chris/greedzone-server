const router = require('koa-router')()
const user = require('./children/user')
const article = require('./children/article')
const message = require('./children/message')
const login = require('./children/login')

router.use('/user', user.routes(), user.allowedMethods())
router.use('/article', article.routes(), article.allowedMethods())
router.use('/message', message.routes(), message.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())

module.exports = router
