const mongoose = require('mongoose')

let UserSchema = require('../mongodb/schemas/user')
let User = mongoose.model('User', UserSchema)

module.exports = User