// routes/pageRoutes.js
const express = require('express');
const router = express.Router();

// Middleware to check authentication
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  }
  res.redirect('/');
}

// GET route for User Dashboard
router.get('/userpage', isAuthenticated, (req, res) => {
  res.render('userpage', { user: req.session.user });
});

// GET route for Reel (Video Reviews)
router.get('/reel', isAuthenticated, (req, res) => {
  // For demo, reviews can be an empty array or dummy data
  res.render('reel', { user: req.session.user, reviews: [] });
});

// GET route for Sell Books page
router.get('/sell', isAuthenticated, (req, res) => {
  res.render('sell', { user: req.session.user });
});

// GET route for Read Online page
router.get('/readonline', isAuthenticated, (req, res) => {
  res.render('readonline', { user: req.session.user });
});

// GET route for Admin Dashboard (example: only allow if user is admin)
router.get('/admin', isAuthenticated, (req, res) => {
  // For example, check if user's email matches admin
  if (req.session.user.email !== 'admin@example.com') {
    return res.redirect('/');
  }
  res.render('admin', { user: req.session.user });
});

module.exports = router;
