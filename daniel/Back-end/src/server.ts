import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mysql, { QueryError } from 'mysql2';
import cors from 'cors';

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

db.connect((err: QueryError | null) => {
  if (err) {
    console.error('MySQL connection error:', err);
    process.exit(1);
  }
  console.log('MySQL Connected...');
  db.query(`CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    dateOfBirth DATE
  )`, (err: QueryError | null) => {
    if (err) {
      console.error('Error creating users table:', err);
      process.exit(1);
    }
    console.log('Users table created or already exists');
  });
});

app.get('/users', (req: Request, res: Response) => {
  db.query('SELECT * FROM users', (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error fetching users');
    res.status(200).json({ result });
  });
});

app.post('/register', (req: Request, res: Response) => {
  const { email, password, firstName, lastName, dateOfBirth } = req.body;
  if (!email || !password || !firstName || !lastName || !dateOfBirth) {
    return res.status(400).send('All fields are required');
  }

  db.query(
    'INSERT INTO users (email, password, firstName, lastName, dateOfBirth) VALUES (?, ?, ?, ?, ?)', 
    [email, password, firstName, lastName, dateOfBirth], 
    (err: QueryError | null) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Email already exists');
        return res.status(500).send('Error inserting user');
      }
      res.status(201).send('User registered');
    }
  );
});

app.post('/UsersGenerator', (req: Request, res: Response) => {
  const users = req.body;
  if (!Array.isArray(users) || users.length === 0) {
    return res.status(400).send('Invalid input');
  }

  const values = users.map(user => [
    user.email, user.password, user.firstName, user.lastName, user.dateOfBirth
  ]);

  db.query(
    'INSERT INTO users (email, password, firstName, lastName, dateOfBirth) VALUES ?',
    [values],
    (err: QueryError | null) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Duplicate email entries found');
        return res.status(500).send('Error inserting users');
      }
      res.status(201).send('Users registered successfully');
    }
  );
});

app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).send('Email and password are required');

  db.query('SELECT * FROM users WHERE email = ?', [email], (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error querying user');
    if (result.length === 0) return res.status(404).send('User not found');

    if (password !== result[0].password) return res.status(401).send('Password incorrect');
    
    const user = {
      id: result[0].id,
      firstName: result[0].firstName,
      lastName: result[0].lastName,
    };
    res.status(200).json(user);
  });
});

app.post('/changePassword', (req: Request, res: Response) => {
  const { userId, oldPassword, newPassword } = req.body;

  if (!userId || !oldPassword || !newPassword) {
    return res.status(400).send('All fields are required');
  }

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error querying user');
    if (result.length === 0) return res.status(404).send('User not found');

    if (oldPassword !== result[0].password) return res.status(401).send('Old password incorrect');

    db.query('UPDATE users SET password = ? WHERE id = ?', [newPassword, userId], (err: QueryError | null) => {
      if (err) return res.status(500).send('Error updating password');
      res.status(200).send('Password changed successfully');
    });
  });
});

// Endpoint to delete user account
app.post('/delete-account', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error querying user');
    if (result.length === 0) return res.status(404).send('User not found');

    if (password !== result[0].password) return res.status(401).send('Password incorrect');

    db.query('DELETE FROM users WHERE email = ?', [email], (err: QueryError | null) => {
      if (err) return res.status(500).send('Error deleting user');
      res.status(200).send('User account deleted successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
