import { RowDataPacket } from "mysql2";
import db, { dbPool } from "../db"

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    age: string;
}

interface UserRow extends RowDataPacket, User { };

export const selectUserByEmail = async (email: string) => {
    const query = 'SELECT * FROM sys.users WHERE email = ?';
    const [rows] = await dbPool.query<UserRow[]>(query, [email]);

    return rows[0];
};


export const createAccount = async (user: User) => {
    const { firstName, lastName, age, email, password } = user;
    const query = 'INSERT INTO sys.users (firstName, lastName, age, email, password) VALUES (?, ?, ?, ?, ?)';
    await dbPool.query(query, [firstName, lastName, age, email, password]);
}

export const updatePassword = async (email: string, newPassword: string) => {
    const query = 'UPDATE sys.users SET password = ? WHERE email = ?';
    await dbPool.query(query, [newPassword, email])
}

export const deleteUser = async (email: string) => {
    const query = 'DELETE FROM sys.users WHERE email = ?';
    await dbPool.query(query, [email])
}


export const getAllUsers = async () => {
    const query = 'SELECT * FROM sys.users';
    const [users] = await dbPool.query<UserRow[]>(query);
    return users;
}