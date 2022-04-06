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

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// voting that'll change to stars 
User.belongsToMany(Post, {
    through: Star,
    as: 'stared_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Star,
    as: 'stared_posts',
    foreignKey: 'post_id'
});

Star.belongsTo(User, {
    foreignKey: 'user_id'
});

Star.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Star, {
    foreignKey: 'user_id'
});

Post.hasMany(Star, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Star, Comment};