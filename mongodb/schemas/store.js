const Schema = require('mongoose').Schema

const Store = new Schema({
	id: {type: String, unique: true}
})

module.exports = Store