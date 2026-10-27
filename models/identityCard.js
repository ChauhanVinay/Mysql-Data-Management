const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const IdentityCard = sequelize.define('identityCard', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  cardNo: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = IdentityCard;