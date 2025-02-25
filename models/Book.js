// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  author:     { type: String, required: true },
  description:{ type: String },
  price:      { type: Number, required: true },
  image:      { type: String },
  genre:      { type: String },
  totalBuys:  { type: Number, default: 0 }
});

module.exports = mongoose.model('Book', bookSchema);
