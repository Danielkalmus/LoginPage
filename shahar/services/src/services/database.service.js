const mysql = require('mysql2');


const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "pecnac-jukge0-godbYz",
  database: "s_training_db",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pecnac-jukge0-godbYz",
  database: "s_training_db",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id', connection.threadId);
});

module.exports = { connection, pool };
