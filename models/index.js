const Students = require('./students');
const IdentityCard = require('./identityCard');

// 1:1 Association (One Student has One Identity Card)
Students.hasOne(IdentityCard, { foreignKey: 'studentId', onDelete: 'CASCADE' });
IdentityCard.belongsTo(Students, { foreignKey: 'studentId' });

module.exports = {
  Students,
  IdentityCard
};