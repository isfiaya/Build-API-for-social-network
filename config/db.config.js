const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
    host: "sql4.freesqldatabase.com",
    user: "sql4417165",
    password: "KrEsm16xyJ",
    database: "sql4417165",
    port: 3306
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = connection;