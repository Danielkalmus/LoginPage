import express from 'express';
import { pool } from '../config/db'

const router = express.Router();

router.post('/user', (req, res) => {
    console.log('create user');
    res.send('create user');

  });
router.get('/user', async (req, res) => {
    const { email } = req.query;
   
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  try {
    const [rows] = await pool.query(
      'SELECT * FROM s_training_db.users WHERE user_email = ?;',
      [email]
    );

    if ((rows as any[]).length > 0) {
      return res.json(rows);
    } else {
      return res.status(404).json({ success: false, message: 'No such user' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: (err as Error).message });
  }
});


router.put('/user', (req, res) => {
    console.log('Update user');
    res.json('Update user');
});
router.delete('/user', (req, res) => {
    console.log('Delete user');
    res.json('Delete user');
});

export default router;