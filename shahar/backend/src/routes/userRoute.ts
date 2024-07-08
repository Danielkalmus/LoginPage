import express, { Request, Response } from 'express';
import { registerUser, getUserByEmail, authenticateUser, deleteUser, updateUserField } from '../services/userService';

const router = express.Router();

interface RegisterRequest extends Request {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: Date;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface UserQueryRequest extends Request {
  query: {
    email: string;
  };
}

router.post('/user', async (req: RegisterRequest, res: Response) => {
  const { firstName, lastName, email, password, birthday } = req.body;
  try {
    await registerUser({ firstName, lastName, email, password, birthday });
    res.status(201).json({ success: true });
  } catch (err) {
    if (err instanceof Error && err.message === 'An account already exists with this email address') {
      res.status(409).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});

router.get('/user', async (req: UserQueryRequest, res: Response) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }
  try {
    const user = await getUserByEmail(email as string); // Type assertion
    res.json(user);
  } catch (err) {
    if (err instanceof Error && err.message === 'No user found with this email') {
      res.status(404).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});

router.post('/userLogin', async (req: LoginRequest, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await authenticateUser(email, password);
    if (user) {
      res.json({ success: true, user });
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'Incorrect email or password'
      || err instanceof Error &&  err.message === 'No user found with this email') {
      res.status(401).json({ success: false, message: err.message });
    } else {
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});

router.put('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { field, newValue } = req.body;
  
    try {
      console.log(id);
      console.log(Number(id));
      await updateUserField(Number(id), field, newValue);
      res.status(200).json({ success: true, message: `User with ID ${id} updated successfully` });
    } catch (error) {
      console.error(`Failed to update user with ID ${id}:`, error);
      res.status(500).json({ success: false, message: 'Failed to update user' });
    }
});

router.delete('/user', async (req: UserQueryRequest, res: Response) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email parameter is missing' });
  }
  try {
    await deleteUser(email);
    res.status(200).json({ success: true, message: `User with email ${email} deleted successfully` });
  } catch (err) {
    if (err instanceof Error && err.message === 'User does not exist') {
      res.status(404).json({ success: false, message: err.message });
    } else {
      console.error('Error deleting user:', err);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
});

export default router;
