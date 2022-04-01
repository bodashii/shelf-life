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