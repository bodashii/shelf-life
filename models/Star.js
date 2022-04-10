// May not be in the MVP right away!

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Star extends Model {}

Star.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
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
        modelName: 'star'
    }
);

module.exports = Star;