const Students = require('./students');
const IdentityCard = require('./identityCard');
const Courses = require('./course');
const studentCourses = require("./studentCourses");

// 1:1 Association (One Student has One Identity Card)
Students.hasOne(IdentityCard, { foreignKey: 'studentId', onDelete: 'CASCADE' });
IdentityCard.belongsTo(Students, { foreignKey: 'studentId' });


// 1:M Association (One student can have multiple records/cards/posts)
// Students.hasMany(IdentityCard, { foreignKey: 'studentId', onDelete: 'CASCADE' });
// IdentityCard.belongsTo(Students, { foreignKey: 'studentId' });

//M:M Association
Students.belongsToMany(Courses, {through: studentCourses});
Courses.belongsToMany(Students, {through: studentCourses});

module.exports = {
  Students,
  IdentityCard,
  Courses,
  studentCourses
};