import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import dbConn from './db';



dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

dbConn.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database.');
  });

app.use('/api', userRoutes)


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});