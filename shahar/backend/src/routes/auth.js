import { Router } from 'express';
import { pool } from '../config/db.js'

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM s_training_db.users WHERE user_email = ? AND user_password = ?;',
      [email, password]
    );
    if (rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    await pool.query(
      'INSERT INTO s_training_db.users (user_email, user_password, user_first_name, user_last_name) VALUES (?, ?, ?, ?);',
      [email, password, firstName, lastName]
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
router.post('/home/:user', (req, res) => {
  const { user } = req.params;
})*/

export default router;
