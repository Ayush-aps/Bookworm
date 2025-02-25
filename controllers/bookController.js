// controllers/bookController.js
const Book = require('../models/Book');

// List books for the Shop Now page
exports.listBooks = async (req, res) => {
  try {
    // Filtering by genre if provided; add sorting logic as needed
    const filter = {};
    if (req.query.genre) filter.genre = req.query.genre;
    let books = await Book.find(filter).sort({ price: 1 });
    res.render('shopnow', { books });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching books.");
  }
};

// Add a new book for selling (Sell Books page)
exports.addBook = async (req, res) => {
  try {
    const { title, author, description, price, genre } = req.body;
    // Assume file upload middleware (e.g., multer) sets req.file.filename
    const image = req.file ? req.file.filename : '';
    const book = new Book({ title, author, description, price, genre, image });
    await book.save();
    res.redirect('/books/shopnow');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding book.");
  }
};
