const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {  sendThankYouEmail } = require('../email.js'); // Import the email functions

// signup
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array()[0].msg });
    }
    const email = await User.findOne({ email: req.body.email });
    if (email) {
      return res.status(400).json({ success: false, errors: 'Sorry, this email is already registered' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash
    });
    
    var token = jwt.sign({ _id: user.id }, '123456');

    sendThankYouEmail(user.email);

    await user.save();

    res.json({ success: true , token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, errors: 'Some error occurred' });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, errors: 'Invalid Credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, errors: 'Invalid Credentials' });
    }
    var token = jwt.sign({ _id: user.id }, '123456');
    res.json({ success: true, token:token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, errors: 'Some error occurred' });
  }
};

// user Fetch
exports.fetchUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.send({ user });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
};
