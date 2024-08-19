const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Add bcrypt for hashing passwords

// Test route
const test = (req, res) => {
    res.json('Test is working');
}

// Register User
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if the user already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user with the hashed password
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
}

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Compare the plain text password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        // Return success with the user's role
        res.json({ success: true, message: 'Login successful', role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
}

module.exports = {
    test,
    registerUser,
    loginUser
}
