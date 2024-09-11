const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel");
const {
  fetchAllBooks,
  fetchBookById,
  addBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const { searchBooks } = require("../controllers/bookController");

router.use(authMiddleware);

router.get("/search", searchBooks);

router.get("/new", (req, res) => {
  res.render("newBook", { user: req.user }); 
});

router.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.render("editBook", { book, user: req.user }); 
    } else {
      res.status(404).json({ error: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.render("books", { books, user: req.user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", fetchBookById);

router.post("/", addBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;
