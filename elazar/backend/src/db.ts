import mysql, { RowDataPacket } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

  const db =  mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  export const dbPool =  mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }).promise();


  
export default db;


export const  chechPasswordByEmail = (email: string,password: string)  => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results: RowDataPacket[]) => {
    if (err) {
      console.error('Error executing query:', err);
      return 500;
    }

    if (results.length === 0) {
      return 404;
    }

    const user = results[0];

    if (user.password === password) {
      return 200;
    } else {
      return 401
    }
  });
}