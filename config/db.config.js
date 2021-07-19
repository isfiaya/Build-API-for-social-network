const mysql = require("mysql");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "sql4.freesqldatabase.com",
  user: "sql4426425",
  password: "8zgN9ifiGK",
  database: "sql4426425",
  port: 3306
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;