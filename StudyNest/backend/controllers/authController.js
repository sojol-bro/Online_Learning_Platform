const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { name, email, password, promocode } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const userId = await User.createUser(name, email, hashed, promocode);
    res.status(201).json({ message: 'User created', userId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
