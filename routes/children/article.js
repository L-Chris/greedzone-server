const router = require('koa-router')()
const ArticleCtr = require('../../controllers/article')

router.get('/save', ArticleCtr.save)
router.get('/del', ArticleCtr.del)
router.get('/get', ArticleCtr.get)
router.get('/img/base64', ArticleCtr.getImgBase64)

module.exports = router