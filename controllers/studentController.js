const db = require('../config/db');

//1. Insert a new student
exports.createStudent = async (req, res) => {
    try {
        const { name, email } = req.body;

 if(!name || !email) {
 return res.status(400).json({ error: 'Name and Email required.'});
      }

    const query = 'INSERT INTO students (name, email) VALUES (?, ?)';
const [result] = await db.execute(query, [name, email]);
console.log(`[DB INSERT] Added student with ID: ${result.insertId}, Name: ${name}`);

res.status(201).json({
    message: 'Student created successfully',
    student: { id: result.insertId, name, email }
});
 } catch(error) {
    console.error('[DB INSERT ERROR]:', error.message);
    res.status(500).json({ error: error.message });
 }
};

//2. Updating existing student by ID
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

 const query = 'UPDATE students SET name = ?, email = ? WHERE id = ?';
 const [result]  = await db.execute(query, [name, email, id]);

 // Check if the student existed
    if (result.affectedRows === 0) {
      console.log(`[DB UPDATE] Student not found with ID: ${id}`);
    return res.status(404).json({ error: `Student with ID ${id} not found.` });
    }

    console.log(`[DB UPDATE] Updated student ID: ${id} -> Name: ${name}, Email: ${email}`);

    res.status(200).json({
      message: 'Student updated successfully',
      student: { id, name, email }
    });
    } catch (error) {
    console.error('[DB UPDATE ERROR]:', error.message);
    res.status(500).json({ error: error.message });
  }
};

//Delete student by ID
exports.deleteStudent = async (req, res) => {
    try {
        const {id} = req.params;

        const query = 'DELETE FROM students WHERE id = ?';
        const [result] = await db.execute(query, [id]);

        // Check if the student existed
    if (result.affectedRows === 0) {
      console.log(`[DB DELETE] Student not found with ID: ${id}`);
      return res.status(404).json({ error: `Student with ID ${id} not found.` });
    }
    console.log(`[DB DELETE] Deleted student ID: ${id}`);

    res.status(200).json({ message: `Student with ID ${id} deleted successfully.` });
    } catch (error) {
    console.error('[DB DELETE ERROR]:', error.message);
    res.status(500).json({ error: error.message });
  }
};