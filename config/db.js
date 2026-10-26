const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'testdb',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',


    {
        dialect: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        logging: console.log
    }
);



module.exports = sequelize;

// const mysql = require('mysql2');
// require('dotenv').config();

// const pool = mysql.createPool({
//     host: process.env.DB_POST || 'localhost',
//     user: process.env.DB_USER || 'root',
//     password: process.env.DB_PASSWORD || '',
//     database: process.env.DB_NAME || 'testdb',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });  

// module.exports = pool.promise();