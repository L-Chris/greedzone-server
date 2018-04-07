const mongoose = require('mongoose')

let StoreSchema = require('../mongodb/schemas/store')
let Store = mongoose.model('store', StoreSchema)

module.exports = Store