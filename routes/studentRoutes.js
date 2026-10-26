const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

//POST /student - Add new record
router.post('/', studentController.createStudent );

//PUT /students/:id - Update record by ID
router.put('/:id', studentController.updateStudent);

//DELETE /students/:id - Delete record by ID
router.delete('/:id', studentController.deleteStudent);

module.exports = router;