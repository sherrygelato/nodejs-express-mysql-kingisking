// mysql setting
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306" ,
    user: "root",
    password: "adminadmin",
    database: "mediation_server",

    /*
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    */
});

module.exports = connection;