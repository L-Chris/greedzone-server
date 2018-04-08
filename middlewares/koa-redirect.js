const fs = require('fs')

const koaRedirect = async (ctx, next) => {
  if (ctx.status === 404 && !ctx.request.url.includes('/api')) {
    ctx.body = fs.readFileSync('./public/index.html', 'utf8')
  }
}

module.exports = koaRedirect