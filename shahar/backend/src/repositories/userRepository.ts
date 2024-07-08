import { pool } from '../config/db'
import { RowDataPacket } from 'mysql2/promise';

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: Date;
}

interface UserRow extends RowDataPacket, User { }


const findUserByEmail = async (email: string): Promise<User[]> => {
  const [rows] = await pool.query<UserRow[]>(
    'SELECT * FROM s_training_db.users WHERE email = ?;',
    [email]
  );
  return rows;
};

const findUserByID = async (id: number): Promise<User[]> => {
  const [rows] = await pool.query<UserRow[]>(
    'SELECT * FROM s_training_db.users WHERE id = ?;',
    [id]
  );
  return rows;
};

const createUser = async (user: User): Promise<void> => {
  const { firstName, lastName, email, password, birthday } = user;
  await pool.query(
    'INSERT INTO s_training_db.users (email, password, first_name, last_name, birthday) VALUES (?, ?, ?, ?, ?)',
    [email, password, firstName, lastName, birthday]
  );
};

const deleteUserByEmail = async (email: string): Promise<void> => {
  await pool.query(
    'DELETE FROM s_training_db.users WHERE email = ?;',
    [email]
  );
};

const updateUserInfo = async (userId: number, field: string, newValue: any): Promise<void> => {
  await pool.query(
    `UPDATE s_training_db.users SET ${field} = ? WHERE id = ?`,
    [newValue, Number(userId)]
  );
};

export {
  User,
  findUserByEmail,
  findUserByID,
  createUser,
  deleteUserByEmail,
  updateUserInfo
};