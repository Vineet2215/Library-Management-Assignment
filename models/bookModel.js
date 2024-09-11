const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: Date,
  isbn: { type: String, unique: true }
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
