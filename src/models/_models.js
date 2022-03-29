const user = require('./User')
const post = require('./Post')
const comment = require('./Comment')

const Models = {}

Models[user.tablename] = user
Models[post.tablename] = post
Models[comment.tablename] = comment

module.exports = Models