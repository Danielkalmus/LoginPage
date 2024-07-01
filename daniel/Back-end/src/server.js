const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'sys'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('MySQL Connected...');
  db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
  )`, err => {
    if (err) {
      console.error('Error creating users table:', err);
      process.exit(1);
    }
    console.log('Users table created or already exists');
  });
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).send('Error fetching users');
    res.status(200).json({ result });
  });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email and password are required');

  db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], err => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Email already exists');
      return res.status(500).send('Error inserting user');
    }
    res.status(201).send('User registered');
  });
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email and password are required');

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) return res.status(500).send('Error querying user');
    if (result.length === 0) return res.status(404).send('User not found');

    if (password !== result[0].password) return res.status(401).send('Password incorrect');
    res.status(200).send('Login successful');
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
