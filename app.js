const Koa = require('koa')
const app = new Koa()
const compress = require('koa-compress')
const views = require('koa-views')
const json = require('koa-json')
const session = require('koa-session2')
const MongoStore = require('./lib/mongoStore')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('./mongodb')
const interceptor = require('./middlewares/interceptor')
const koaRedirect = require('./middlewares/koa-redirect')
const path = require('path')
const router = require('./routes')
// 全局变量
global.rootPath = __dirname
// error handler
onerror(app)

// middlewares
app.use(compress({
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(session({
  key: 'SESSIONID',
  store: new MongoStore(),
  maxAge: 10000,
  expires: 10000
}))
app.use(logger())
app.use(require('koa-static')(__dirname + '/public', {
  maxage: 2592000000
}))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  let start = new Date()
  await next()
  let ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(interceptor)
app.use(koaRedirect)
app.use(router.routes())

module.exports = app
