const Schema = require('mongoose').Schema

const User = new Schema({
	account: {type: String, unique: true},
	password: {type: String}
})

module.exports = User
