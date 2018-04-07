const mongoose = require('mongoose')
const config = require('../config')

mongoose.Promise = global.Promise
let db = mongoose.connect(config.mongodb.url)

db.connection.on('error', err => {
  console.log('数据库连接失败：' + err)
})

db.connection.on('open', () => {
  console.log('数据库连接成功')
})

db.connection.on('disconnected', () => {
  console.log('数据哭连接断开')
})