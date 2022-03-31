const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Star extends Model {}

Star.init(
    {
        id: {

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