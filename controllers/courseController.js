const { Courses, Students } = require('../models');

// POST /addCourse - Add a course
const addCourse = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Course name is required.' });
    }
    const course = await Courses.create({ name });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /addStudentCourses - Add student to multiple courses (Junction table)
const addStudentToCourses = async (req, res) => {
  try {
    const { studentId, courseIds } = req.body;
    const student = await Students.findByPk(studentId);

    if (!student) {
      return res.status(404).json({ error: `Student with ID ${studentId} not found` });
    }

    const coursesFound = await Courses.findAll({
      where: {
        id: courseIds
      }
    });

    // Use addCourses for multiple records
    await student.addCourses(coursesFound);

    // Return student with their associated courses
    const updatedStudent = await Students.findByPk(studentId, {
      include: [Courses]
    });

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addCourse,
  addStudentToCourses
};