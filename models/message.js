const mongoose = require('mongoose')

let MessageSchema = require('../mongodb/schemas/message')
let Message = mongoose.model('Message', MessageSchema)

module.exports = Message