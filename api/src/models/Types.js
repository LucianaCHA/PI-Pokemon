const {DataTypes } = require ('sequelize');

require('dotenv').config();

module.exports = (sequelize) => {
    sequelize.define('type',{
        name: {
            type: DataTypes.STRING,
        }
    })
}