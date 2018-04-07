const mongoose = require('mongoose')

let ArticleSchema = require('../mongodb/schemas/article')
let Article = mongoose.model('Article', ArticleSchema)

module.exports = Article