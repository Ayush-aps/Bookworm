// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Route for Shop Now page to list books
router.get('/shopnow', bookController.listBooks);

// Route to handle selling a book (form submission)
router.post('/sell', bookController.addBook);

module.exports = router;
