const User = require('../models/user')
const BaseCtr = require('./base')

const attrArr = ['account', 'password']

class LoginCtrl extends BaseCtr {
  constructor (params) {  
    super(params)
    params = BaseCtr.filterObj(attrArr, params)
    Object.assign(this, params)
  }
	// 登录
	static async login (ctx) {
		let {account, password} = ctx.request.body
		if (!account || !password) {
			return ctx.error({message: '账号或密码不能为空！'})
		}
		let res = await User.findOne({account})
		if (!res) {
			return ctx.error({message: '账号不存在！'})	
		} else if (res.password !== password) {
			return ctx.error({message: '密码错误！'})
		}
		ctx.session.user = {
			id: Math.random()
		}
		ctx.success({data: res, message: '登陆成功'})
	}
}

module.exports = LoginCtrl