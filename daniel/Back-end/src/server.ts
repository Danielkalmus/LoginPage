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

  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      password VARCHAR(255),
      firstName VARCHAR(255),
      lastName VARCHAR(255),
      dateOfBirth DATE
    )`;

  const createCompaniesTableQuery = `
    CREATE TABLE IF NOT EXISTS companies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      address VARCHAR(255),
      totalEmployees INT DEFAULT 0
    )`;

  db.query(createUsersTableQuery, (err: QueryError | null) => {
    if (err) {
      console.error('Error creating users table:', err);
      process.exit(1);
    }
    console.log('Users table created or already exists');
  });

  db.query(createCompaniesTableQuery, (err: QueryError | null) => {
    if (err) {
      console.error('Error creating companies table:', err);
      process.exit(1);
    }
    console.log('Companies table created or already exists');
  });
});

// Endpoint to get all users
app.get('/users', (req: Request, res: Response) => {
  db.query('SELECT * FROM users', (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error fetching users');
    res.status(200).json({ result });
  });
});

// Endpoint to get a single user by ID
app.get('/users/:userId', (req: Request, res: Response) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error fetching user');
    if (result.length === 0) return res.status(404).send('User not found');
    res.status(200).json(result[0]);
  });
});

// Endpoint to register a new user
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

// Endpoint to generate multiple users
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

// Endpoint to login a user
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

// Endpoint to update user information
app.post('/updateUser', (req: Request, res: Response) => {
  const { userId, oldPassword, newPassword, email, firstName, lastName, dateOfBirth } = req.body;

  if (!userId || !oldPassword || !newPassword || !email || !firstName || !lastName || !dateOfBirth) {
    return res.status(400).send('All fields are required');
  }

  db.query('SELECT * FROM users WHERE id = ?', [userId], (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error querying user');
    if (result.length === 0) return res.status(404).send('User not found');

    if (oldPassword !== result[0].password) return res.status(401).send('Old password incorrect');

    const updateUserQuery = `
      UPDATE users 
      SET email = ?, password = ?, firstName = ?, lastName = ?, dateOfBirth = ? 
      WHERE id = ?`;

    db.query(
      updateUserQuery,
      [email, newPassword, firstName, lastName, dateOfBirth, userId],
      (err: QueryError | null) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('Email already exists');
          return res.status(500).send('Error updating user');
        }
        res.status(200).send('User information updated successfully');
      }
    );
  });
});

// Endpoint to delete a user account
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

// Endpoint to get all companies
app.get('/companies', (req: Request, res: Response) => {
  db.query('SELECT * FROM companies', (err: QueryError | null, result: any) => {
    if (err) return res.status(500).send('Error fetching companies');
    res.status(200).json({ result });
  });
});

// Endpoint to add a new company
app.post('/companies', (req: Request, res: Response) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return res.status(400).send('Name and address are required');
  }

  db.query(
    'INSERT INTO companies (name, address) VALUES (?, ?)',
    [name, address],
    (err: QueryError | null) => {
      if (err) return res.status(500).send('Error inserting company');
      res.status(201).send('Company added successfully');
    }
  );
});

// Endpoint to handle batch insertion of companies
app.post('/CompaniesGenerator', (req: Request, res: Response) => {
  const companies = req.body;
  if (!Array.isArray(companies) || companies.length === 0) {
    return res.status(400).send('Invalid input');
  }

  const values = companies.map(company => [
    company.name, company.address, company.totalEmployees
  ]);

  db.query(
    'INSERT INTO companies (name, address, totalEmployees) VALUES ?',
    [values],
    (err: QueryError | null) => {
      if (err) return res.status(500).send('Error inserting companies');
      res.status(201).send('Companies registered successfully');
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
