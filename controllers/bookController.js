const Book = require("../models/bookModel");

exports.fetchAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render("books", { books, user: req.user });
  } catch (error) {
    console.error("Error fetching books:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching books." });
  }
};

exports.fetchBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res
      .status(500)
      .json({ error: "Internal server error while fetching the book." });
  }
};

exports.addBook = async (req, res) => {
  const { title, author, publishedDate, isbn } = req.body;

  if (!title || !author || !isbn) {
    return res
      .status(400)
      .json({ error: "Title, Author, and ISBN are required." });
  }

  const newBook = new Book({ title, author, publishedDate, isbn });
  try {
    await newBook.save();
    res.redirect("/books"); 
  } catch (error) {
    console.error("Error adding book:", error);
    res
      .status(500)
      .json({ error: "Internal server error while adding the book." });
  }
};

exports.updateBook = async (req, res) => {
  const { title, author, publishedDate, isbn } = req.body;

  if (!title || !author || !isbn) {
    return res
      .status(400)
      .json({ error: "Title, Author, and ISBN are required." });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, publishedDate, isbn },
      { new: true, runValidators: true }
    );

    if (updatedBook) {
      res.redirect("/books");
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error updating book:", error);
    res
      .status(500)
      .json({ error: "Internal server error while updating the book." });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (book) {
      res.redirect("/books");
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    console.error("Error deleting book:", error);
    res
      .status(500)
      .json({ error: "Internal server error while deleting the book." });
  }
};

exports.searchBooks = async (req, res) => {
  const query = req.query.query || "";

  try {
    const books = await Book.find({
      $or: [
        { title: new RegExp(query, "i") },
        { author: new RegExp(query, "i") },
      ],
    });

    res.render("books", { books, user: req.user });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal server error");
  }
};
