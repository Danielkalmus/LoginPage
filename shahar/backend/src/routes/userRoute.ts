import express from 'express';

const router = express.Router();

router.post('/user', (req, res) => {
    console.log('create user');
    res.send('create user');

  });
router.get('/user', (req, res) => {
    console.log('Get user');
    res.json('Get user');
});
router.put('/user', (req, res) => {
    console.log('Update user');
    res.json('Update user');
});
router.delete('/user', (req, res) => {
    console.log('Delete user');
    res.json('Delete user');
});

export default router;