const User = require('./User.js')
const Post = require('./Post.js')
const Star = require('./Star.js')

// User.hasMany(Post, {
//     foreignKey: ''
// })

// Post.belongsTo(User {
//     foreignKey: ''
// })

module.exports = { User, Post, Star };