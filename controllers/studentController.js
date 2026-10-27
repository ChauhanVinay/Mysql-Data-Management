const { Students, IdentityCard } = require('../models');

// 1. INSERT Student
exports.createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const student = await Students.create({ name, email });
    res.status(201).json({
      message: 'Student created successfully',
      student
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. READ ALL Students (Includes 1:1 IdentityCard)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Students.findAll({
      include: [IdentityCard]
    });
    res.status(200).json({ data: students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. READ ONE Student by ID (Includes 1:1 IdentityCard)
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Students.findByPk(id, {
      include: [IdentityCard]
    });

    if (!student) {
      return res.status(404).json({ error: `Student with ID ${id} not found` });
    }

    res.status(200).json({ data: student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. UPDATE Student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const student = await Students.findByPk(id);
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

// 5. DELETE Student (Cascades to IdentityCard)
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const rowsDeleted = await Students.destroy({
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

// 6. 1:1 INSERT: Create Student and their IdentityCard together
exports.addingValuesToStudentAndIdentityTable = async (req, res) => {
  try {
    const { student, identityCard } = req.body;

    if (!student || !identityCard) {
      return res.status(400).json({ error: 'Both student and identityCard objects are required.' });
    }

    // Create the student first
    const createdStudent = await Students.create(student);

    // Create the 1:1 identity card attached to the created student
    const createdCard = await IdentityCard.create({
      ...identityCard,
      studentId: createdStudent.id
    });

    res.status(201).json({
      message: '1:1 Student and IdentityCard created successfully',
      student: createdStudent,
      identityCard: createdCard
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};