const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Post extends Model {
    // 
    static star(body, models) {
        return models.Star.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then(() => {
            return Post.findOne({
            where: {
                id: body.post_id
            },
            attributes: [
                'id',
                'post_url',
                'title',
                'created_at',
                [
                sequelize.literal('(SELECT COUNT(*) FROM star WHERE post.id = star.post_id)'),
                'star_count'
                ]
            ]
            });
        });
    }
}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            isURL: true,
            
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
            model: 'user',
            key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;