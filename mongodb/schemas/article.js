const Schema = require('mongoose').Schema

const Article = new Schema({
	id: {type: Number, unique: true},
	canRemove: {type: Number},
	createUser: {type: Number},
	createTime: {type: Date},
	updateUser: {type: Number},
	updateTime: {type: Date},
	account: {type: String},
	password: {type: String},
	department: {type: Object},
	nameSpell: {type: String},
	qrcode: {type: String},
	identityCard: {type: String},
	address: {type: String},
	isFirstLogin: {type: String},
	name: {type: String},
	position: {type: String},
	mobile: {type: String},
	openId: {type: String},
	unionId: {type: String},
	gender: {type: String},
	email: {type: String},
	weiXinId: {type: String},
	avatar: {type: String},
	status: {type: String},
	enable: {type: String},
	extattr: {type: String},
	roles: {type: Array},
	tags: {type: Array}
})

module.exports = Article
