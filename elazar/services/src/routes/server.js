import express from 'express';
import bodyParser from 'body-parser';
import * as fs from 'fs';
import mysql from 'mysql2';

const app = express()

const port = 3000;
app.use(bodyParser.json());
app.use(express.json());




const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "sys",
});


db.getConnection((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.post('/api/splunk/update', (req, res) => {
  const { LogName, LogTime } = req.body;

  const logData = {
    LogName,
    LogTime
  };

  const query = 'INSERT INTO sys.logs (logName, logTime) VALUES (?, ?)';
  db.query(query, [logData.LogName, logData.LogTime], (error) => {
    if (error) {
      console.error('Error inserting into DB', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    fs.appendFile('./logs/log.json', JSON.stringify(logData, null, 2) + '\n', 'utf8', (err) => {
      if (err) {
        console.error('Error appending to file', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }

      
      const query = 'SELECT COUNT(*) AS total FROM sys.logs';
      db.query(query, (error, results) => {
        if (error) throw error;
        const counter = results[0].total;
      
      console.log('Content appended to file');
      res.status(200).json({ message: `Log added to DB and data appended to log. There are ${counter} logs.` });
    });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});