const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

 const courses = sequelize.define('courses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false

    }
 }, {
     timestamps: false
 });

 module.exports = courses;