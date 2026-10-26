const express = require('express');
const db = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');


const app = express();
//Parse JSON request bodies
app.use(express.json());

//Ensure table exists on Server start
const initDB = async () => {
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
            )
            `);

            console.log('Students table verified/created');
    } catch (error) {
        console.error('Table creation failed:', error.message);
    }
};

initDB();

//Mount the student router
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});