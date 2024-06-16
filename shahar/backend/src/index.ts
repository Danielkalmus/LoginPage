import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';

const app = express();
const port = 3001;

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Express server');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
