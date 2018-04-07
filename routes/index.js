const router = require('koa-router')()
const api = require('./api')
const base = require('./base')

router.use('/', base.routes(), base.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())

module.exports = router
