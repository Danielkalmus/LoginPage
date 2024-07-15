import { Console } from 'console';
import { pool } from '../services/databat.service'
import { RowDataPacket } from 'mysql2/promise';

interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
}

interface UserRow extends RowDataPacket, User { }

const formatDate = (date: Date): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

const findUserByEmail = async (email: string): Promise<User[]> => {
  const [rows] = await pool.query<UserRow[]>(
    'SELECT * FROM s_training_db.users WHERE email = ?;',
    [email]
  );

  const users = rows.map(user => ({
    ...user,
    birthday: formatDate(new Date(user.birthday))
  }));

  return users;
};

const findUserByID = async (id: number): Promise<User[]> => {
  const [rows] = await pool.query<UserRow[]>(
    'SELECT * FROM s_training_db.users WHERE id = ?;',
    [id]
  );

  const users = rows.map(user => ({
    ...user,
    birthday: formatDate(new Date(user.birthday))
  }));

  return users;
};

const findAllUsers = async (): Promise<User[]> => {
  const [rows] = await pool.query<UserRow[]>(
    'SELECT * FROM s_training_db.users;'
  );

 

  return rows;
}

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
  findAllUsers,
  createUser,
  deleteUserByEmail,
  updateUserInfo
};