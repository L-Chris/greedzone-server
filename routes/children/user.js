const UserCtr = require('../../controllers/user')
const router = require('koa-router')()

router.post('/save', UserCtr.save)
router.delete('/delete/:id', UserCtr.del)
router.get('/list', UserCtr.getList)
router.get('/get/:id', UserCtr.get)

module.exports = router