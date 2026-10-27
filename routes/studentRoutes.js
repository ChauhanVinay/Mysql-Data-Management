const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// POST /students - Insert
router.post('/', studentController.createStudent);

// GET /students - Read All (findAll)
router.get('/', studentController.getAllStudents);

// GET /students/:id - Read One (findByPk) -> Added :id
router.get('/:id', studentController.getStudentById);

// PUT /students/:id - Update
router.put('/:id', studentController.updateStudent);

// DELETE /students/:id - Delete
router.delete('/:id', studentController.deleteStudent);

// 1:1 Creation endpoint
router.post('/addingStudentWithCard', studentController.addingValuesToStudentAndIdentityTable);

module.exports = router;