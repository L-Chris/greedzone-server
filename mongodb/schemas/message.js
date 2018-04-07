const Schema = require('mongoose').Schema

const Message = new Schema({
  userId: {type: Number},
  content: {type: String},
	createTime: {type: Date}
})

module.exports = Message