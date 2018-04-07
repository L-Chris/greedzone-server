const MessageCtrl = require('../../controllers/message')
const router = require('koa-router')()

router.post('/save', MessageCtrl.save)
router.delete('/delete/:id', MessageCtrl.del)
router.get('/list', MessageCtrl.getList)
router.get('/get/:id', MessageCtrl.get)

module.exports = router