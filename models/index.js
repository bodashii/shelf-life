const User = require('./User.js')
const Post = require('./Post.js')
const Star = require('./Star.js')
const Comment = require('./Comment.js');

User.hasMany(Post, {
    foreignKey: 'user_id'
})

User.hasMany(Star, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Star.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Star, Comment };