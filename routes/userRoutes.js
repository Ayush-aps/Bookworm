// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for user signup and login (POST requests)
router.post('/signup', userController.signup);
router.post('/login', userController.login);

const books = [
    { title: "SSSCSH", chapters: "123 / 129", rating: "9.1", status: "reading" },
    { title: "Kuroiwa Medaka", chapters: "169", rating: "8.4", status: "reading" },
    { title: "Rent-A-Girlfriend", chapters: "303 / 367", rating: "6.3", status: "reading" },
    { title: "Dandadan", chapters: "184", rating: "9.2", status: "reading" },
    { title: "The Alchemist", chapters: "167", rating: "8.5", status: "completed" },
    { title: "Atomic Habits", chapters: "250", rating: "9.2", status: "reading" },
    { title: "Dune", chapters: "412", rating: "9.0", status: "plan to read" },
    { title: "1984", chapters: "350", rating: "8.7", status: "completed" },
    { title: "Brave New World", chapters: "288", rating: "8.5", status: "reading" }
];

router.get("/userpage", (req, res) => {
    res.render("userpage", { books });  // Ensure books is passed here
});

module.exports = router;