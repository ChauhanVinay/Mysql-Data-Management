const express = require('express');
const db = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
// require('./models/students');
// require('./models/identityCard');
// require('./models/index');

require('./models');


const app = express();
//Parse JSON request bodies
app.use(express.json());
  

//Mount the student router
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);

const PORT = process.env.PORT || 3000;

db.sync ({ alter: true })
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
}).catch((err) => {
    console.log(err);
});
   