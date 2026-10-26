const db = require('../config/db');

//1. Insert a new student
exports.createStudent = async (req, res) => {
    try {
        const { name, email, age} = req.body;

 if(!name || !email || age === undefined) {
 return res.status(400).json({ error: 'Name and Email and age required.'});
      }

    const query = 'INSERT INTO students (name, email, age) VALUES (?, ?, ?)';
const [result] = await db.execute(query, [name, email, age]);
console.log(`[DB INSERT] Added student with ID: ${result.insertId}, Name: ${name}, Age: ${age}`);

res.status(201).json({
    message: 'Student created successfully',
    student: { id: result.insertId, name, email, age }
});
 } catch(error) {
    console.error('[DB INSERT ERROR]:', error.message);
    res.status(500).json({ error: error.message });
 }
};


//GET /students - Retrieve all students
exports.getAllStudents = async (req, res) => {
    try {
  
        const query = 'SELECT * FROM students';
        const [students] = await db.query(query);

 console.log(`[DB SELECT] Retrieved ${students.length} students`);
 res.status(200).json({ data: students});
         
    } catch(error) {
        console.error('[DB SELECT ERROR]:', error.message);
        res.status(500).json({ error: error.message });
    }
};

//GET /students/:id - Retrieve single student by ID
exports.getStudentById = async (req, res) => {
    try {

     const { id } = req.params;
     const query = 'SELECT * FROM students WHERE  id = ?';
     const [rows] = await db.execute(query, [id]);

     if(rows.length === 0) {
        console.log(`[DB SELECT] Student not found with ID: ${id}`);
     return res.status(400).json({ error: `Student with ID: ${id} not found`  });
     }

     console.log(`[DB SELECT] Retrieved  student ID: ${id}`);
     res.status(200).json({ data: rows[0] });

    } catch (error){
        console.error('[DB SELECT ERROR]:', error.message);
        res.status(500).json({ error: error.message });
    }
};

//. PUT Updating existing student by ID
exports.updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age } = req.body;

        if (!name || !email || age === undefined) {
      return res.status(400).json({ error: 'Name, email and age are required.' });
    }

 const query = 'UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?';
 const [result]  = await db.execute(query, [name, email, age, id]);

 // Check if the student existed
    if (result.affectedRows === 0) {
      console.log(`[DB UPDATE] Student not found with ID: ${id}`);
    return res.status(404).json({ error: `Student with ID ${id} not found.` });
    }

    console.log(`[DB UPDATE] Updated student ID: ${id} -> Name: ${name}, Email: ${email}, Age: ${age}`);

    res.status(200).json({
      message: 'Student updated successfully',
      student: { id, name, email, age }
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