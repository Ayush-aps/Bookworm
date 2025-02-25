// controllers/userController.js
const User = require('../models/User');

// Handle user signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Create new user (for production, hash the password using bcrypt)
    const user = new User({ username, email, password });
    await user.save();
    // Store user in session after signup
    req.session.user = user;
    res.redirect('/userpage');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error signing up.");
  }
};

// Handle user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found.");
    }
    // For production, compare hashed passwords with bcrypt.compare
    if (user.password !== password) {
      return res.status(401).send("Invalid password.");
    }
    // Store user in session upon successful login
    req.session.user = user;
    res.redirect('/userpage');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in.");
  }
};
