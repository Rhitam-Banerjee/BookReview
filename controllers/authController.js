const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.signup = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  const token = generateToken(user);
  res.status(201).json({ token });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  const token = generateToken(user);
  res.json({ token });
};
