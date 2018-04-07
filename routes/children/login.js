const LoginCtrl = require('../../controllers/login')
const router = require('koa-router')()

router.post('/', LoginCtrl.login)

module.exports = router