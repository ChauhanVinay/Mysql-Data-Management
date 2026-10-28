const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

router.post('/addCourse', courseController.addCourse);
router.post('/addStudentCourses', courseController.addStudentToCourses);

module.exports = router;