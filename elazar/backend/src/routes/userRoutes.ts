import express, { Request, Response } from 'express';
import { createNewAccount, deleteAccount, getAllTheUsers, loginUser, updateUser } from '../Services/service';
import { dbPool } from '../db';
import { RowDataPacket } from 'mysql2';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
}

interface UserRow extends RowDataPacket, User { };

interface ParamsReq extends Request {
  query: {
    firstName: string,
    lastName: string,
    age: string,
    email: string,
    password: string,
  }
}

interface updateReq extends Request {
  body: {
    email: string,
    password: string,
  }
}
const router = express.Router();

router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await getAllTheUsers();
    res.json(users);
  }
  catch (error) {
    if (error instanceof Error && error.message === "Internal Server Error") {
      res.status(500).send(error.message)
    }
  }
});

router.post('/createUser', async (req: ParamsReq, res: Response) => {
  const user: User = req.body;
  try {
    await createNewAccount(user)
    res.status(201).send('User created successfully');
  }
  catch (error) {
    if (error instanceof Error && error.message === "User already exist.") {
      res.status(409).send(error.message)
    }
    else {
      res.status(500).send('Internal Server Error');
    }
  }
});

router.get('/getUser', async (req: ParamsReq, res: Response) => {
  const { email, password } = req.query;
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const user = await loginUser(email, password);
    res.status(201).send({ massage: 'Login successful.', name: user.firstName });
  }
  catch (error) {
    if (error instanceof Error && error.message === "User not found.") {
      res.status(404).send(error.message)
    }
    else if (error instanceof Error && error.message === "Invalid password.") {
      res.status(401).send(error.message)
    }
    else {
      res.status(500).send('Internal Server Error');
    }
  }
});



router.put('/updateUser', async (req: updateReq, res: Response) => {
  const { email, password } = req.body;
  try {
    await updateUser(email, password)
    res.status(200).send('Change password successful.');
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
});

router.delete('/deleteUser', async (req: ParamsReq, res: Response) => {
  const { email } = req.query;
  try {
    await deleteAccount(email);
    res.status(200).send('delete user successful.');
  } catch (error) {
    res.status(500).send('Internal server error.');
  }
});

export default router;
