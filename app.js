const express = require('express');
const db = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
require('./models/students');


const app = express();
//Parse JSON request bodies
app.use(express.json());
  

//Mount the student router
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;

db.sync ({ alter: true })
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
}).catch((err) => {
    console.log(err);
});
