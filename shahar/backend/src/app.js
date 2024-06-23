import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { pool } from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM s_training_db.users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
