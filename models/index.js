const User = require('./User.js')
const Post = require('./Post.js')
const Star = require('./Star.js')

User.hasMany(Post, {
    foreignKey: 'user_id'
})

User.hasMany(Star, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Star.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Post, Star };