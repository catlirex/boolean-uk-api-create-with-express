// No need to import the Book model just the db
const Book = require("./model");
const { createOneBook, getAllBooks, getBookById } = Book();

const reqAllBooks = (req, res) => {
  getAllBooks((result) => {
    res.json({ AllBooks: result.rows });
  });
};

const reqBookById = (req, res) => {
  const { id } = req.params;
  getBookById(id, (result) => {
    res.json({ result: result.rows });
  });
};

const addNewBook = (req, res) => {
  const newBook = req.body;
  console.log(newBook);
  createOneBook(newBook, (result) => {
    res.json({ newBook: result.rows });
  });
};

module.exports = { reqAllBooks, reqBookById, addNewBook };
