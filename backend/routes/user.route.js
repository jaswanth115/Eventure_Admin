import express from 'express';
import { User } from '../models/user.model.js'; // Adjust the path to your user model
import { Package } from '../models/package.model.js';

const router = express.Router();

// PUT route to update user role
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route to find a user by email
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error); // More detailed error logging
    res.status(500).json({ message: error.message });
  }
});


// POST route to create a new user
router.post('/', async (req, res) => {
    const { email, role } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, role });
        await newUser.save();
        res.status(201).json({ success: true, user: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route to fetch users with role 'User'
router.get('/just-users', async (req, res) => {
    try {
        const users = await User.find({ role: 'User' }); // Find users with role 'User'
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching just users:', error); // More detailed error logging
        res.status(500).json({ message: error.message });
    }
});

export default router;
