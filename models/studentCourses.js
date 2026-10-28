const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const studentCourses  = sequelize.define('studentCourses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }

}, {
    timestamps: false
})

module.exports = studentCourses;