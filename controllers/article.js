const Article = require('../models/article')
const BaseCtr = require('./base')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

let attrArr = ['id', 'canRemove', 'createUser', 'createTime', 'updateUser', 'updateTime', 'account', 'password', 'department', 'nameSpell', 'qrcode', 'identityCard', 'address', 'isFirstLogin', 'name', 'position', 'mobile', 'openId', 'unionId', 'gender', 'email', 'weiXinId', 'avatar', 'enable', 'status', 'extattr', 'roles', 'tags']
// html
const asyncReq = url => new Promise((resolve, reject) => request.get(url, (err, response, body) => {
  if (err) {
    reject(err)
  } else {
    resolve(body)
  }
}))
// 图像
const asyncReqImg = url => new Promise((resolve, reject) => {
  let chunks = []
  let size = 0
  request.get(url, (err, response, body) => {
    if (err) { reject(err) }
  }).on('data', chunk => {
    chunks.push(chunk)
    size += chunk.length
  }).on('end', err => {
    let imgBase64Url = Buffer.concat(chunks, size).toString('base64')
    resolve(`data:image/png;base64,${imgBase64Url}`)
  })
})

class ArticleCtr extends BaseCtr {
  constructor (params) {  
    super(params)
    params = BaseCtr.filterObj(attrArr, params)
    Object.assign(this, params)
  }
  // 保存文章信息
  static async save(ctx, next) {
    let params = BaseCtr.filterObj(attrArr, ctx.request.body)

    let res = await Article.findOneAndUpdate({id: params.id}, params, {new: true, upsert: true})

    return ctx.success({data: res})
  }
  // 删除文章信息
  static async del(ctx, next) {
    let {id} = ctx.params

    let res = await Article.remove({ id: id })
    
    return ctx.success({data: res})
  }
  // 获取img的base64编码
  static async getImgBase64 (ctx, next) {
    let {url} = ctx.query
    let imgBase64Url = await asyncReqImg(url)
    ctx.body = imgBase64Url
  }
  // 获取文章信息
  static async get(ctx, next) {
    let {url} = ctx.query
    let body = await asyncReq(url)
    let $ = cheerio.load(body)
    for (let i = 0; i < $('img').length; i++) {
      let $img = $('img').eq(i+1)
      let url = $img.attr('src') ? $img.attr('src') : $img.attr('data-src')
      if (!url) { break }
      let regexp = /http:/.test(url)
      if (!regexp) { break }
      let apiUrl = `http://localhost:3000/api/article/img/base64?url=${url}`
      $img.attr('data-src', apiUrl)
      $img.attr('src', null)
    }
    // 去除script标签内容
    $('script').each(function(i, elm) {
      $(elm).html('')
    })
    fs.writeFileSync(`${global.rootPath}/resource/articles/1.txt`, $.html(), err => {
      if (err) { return err }
    })
    // return ctx.success({ data: $.html() })
    ctx.body = $.html()
  }
  // 获取用户列表
  static async getList(ctx, next) {
    let res = await Article.find()
    return ctx.success({data: res})
  }
}

module.exports = ArticleCtr