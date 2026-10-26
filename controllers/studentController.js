const Student = require('../models/students');

// 1. INSERT: Student.create
exports.createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const student = await Student.create({
      name,
      email
    });

    res.status(201).json({
      message: 'Student created successfully',
      student
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. READ ALL: Student.findAll
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. READ ONE: Student.findByPk
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    res.status(200).json({ data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. UPDATE: findByPk + save
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const student = await Student.findByPk(id); 
    if (!student) {
      return res.status(404).json({ error: `Student with ID ${id} not found` }); 
    }

    if (name) student.name = name;
    if (email) student.email = email;
    await student.save();

    res.status(200).json({
      message: 'Student updated successfully',
      student
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. DELETE: Student.destroy
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await Student.destroy({
      where: { id }
    });

    if (!rowsDeleted) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    res.status(200).json({ message: `Student with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};