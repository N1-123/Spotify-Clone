const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming this is your user model

const JWT_SECRET = 'your_very_strong_and_unique_jwt_secret'; // Replace with a strong secret

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({ email, password: hashedPassword });

    // Save the user to the database
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password presence
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches (using bcrypt.compare)
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' }); // Use 401 for unauthorized
    }

    // Generate a JWT token using a strong secret
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' }); // Ensure expiresIn is appropriate

    return res.json({ token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { signup, signin };