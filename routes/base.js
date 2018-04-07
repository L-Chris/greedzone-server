const fs = require('fs')
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  ctx.body = fs.readFileSync('./public/index.html', 'utf8')
})

module.exports = router