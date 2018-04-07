const Message = require('../models/message')
const BaseCtr = require('./base')

let attrArr = ['id', 'canRemove', 'createUser', 'createTime', 'updateUser', 'updateTime', 'account', 'password', 'department', 'nameSpell', 'qrcode', 'identityCard', 'address', 'isFirstLogin', 'name', 'position', 'mobile', 'openId', 'unionId', 'gender', 'email', 'weiXinId', 'avatar', 'enable', 'status', 'extattr', 'roles', 'tags']

class MessageCtrl extends BaseCtr {
  constructor (params) {  
    super(params)
    params = BaseCtr.filterObj(attrArr, params)
    Object.assign(this, params)
  }
  // 保存聊天信息
  static async save(ctx, next) {
    let params = BaseCtr.filterObj(attrArr, ctx.request.body)

    let res = await Message.findOneAndUpdate({id: params.id}, params, {new: true, upsert: true})

    ctx.success({data: res})
  }
  // 删除聊天信息
  static async del(ctx, next) {
    let {id} = ctx.params

    let res = await Message.remove({ id: id })
    
    ctx.success({data: res})
  }
  // 获取聊天信息
  static async get(ctx, next) {
    let {id} = ctx.params

    let res = await Message.findOne({id: id})

    ctx.success({data: res})
  }
  // 获取聊天列表
  static async getList(ctx, next) {

    let res = await Message.find()

    ctx.success({data: res})
  }
}

module.exports = MessageCtrl