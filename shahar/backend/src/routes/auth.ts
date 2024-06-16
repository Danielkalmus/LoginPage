import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'test@example.com' && password === 'password123') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Simulate a successful signup
  res.status(201).json({ message: 'User created successfully' });
});

export default router;
