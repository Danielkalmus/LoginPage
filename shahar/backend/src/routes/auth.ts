import { Router } from 'express';
import { pool } from '../config/db'

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM s_training_db.users WHERE user_email = ? AND user_password = ?;',
      [email, password]
    );
    if ((rows as any[]).length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Incorrect email or password' });
    }
  }  catch (err) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error: (err as Error).message });
  }
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, birthday } = req.body;
  try {
    // Check if email already exists
    const [emailRows] = await pool.query(
      'SELECT user_email FROM s_training_db.users WHERE user_email = ?',
      [email]
    );

    if ((emailRows as any[]).length > 0) {
      // Email already exists, return conflict status
      return res.status(409).json({ success: false, message: 'An account already exists with this email address' });
    }

    // Email does not exist, proceed with registration
    await pool.query(
      'INSERT INTO s_training_db.users (user_email, user_password, user_first_name, user_last_name, user_birthday) VALUES (?, ?, ?, ?, ?)',
      [email, password, firstName, lastName, birthday]
    );

    res.json({ success: true });
  } catch (err) {
    // Handle any errors during query execution
    res.status(500).json({ success: false, message: 'Internal Server Error', error: (err as Error).message });
  }
});

export default router;
