const User = require('../models/user')
const BaseCtr = require('./base')

let attrArr = ['account', 'password']

class UserCtrl extends BaseCtr {
  constructor (params) {  
    super(params)
    params = BaseCtr.filterObj(attrArr, params)
    Object.assign(this, params)
  }
  // 保存用户信息
  static async save(ctx, next) {
    let params = BaseCtr.filterObj(attrArr, ctx.request.body)

    let res = await User.findOneAndUpdate({account: params.account}, params, {new: true, upsert: true})

    ctx.success({data: res})
  }
  // 删除用户信息
  static async del(ctx, next) {
    let {id} = ctx.params

    let res = await User.remove({ id: id })
    
    ctx.success({data: res})
  }
  // 获取用户信息
  static async get(ctx, next) {
    let {id} = ctx.params

    let res = await User.findOne({id: id})

    ctx.success({data: res})
  }
  // 获取用户列表
  static async getList(ctx, next) {

    let res = await User.find()

    ctx.success({data: res})
  }
}

module.exports = UserCtrl