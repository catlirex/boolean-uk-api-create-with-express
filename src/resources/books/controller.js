// No need to import the Book model just the db
const Book = require("./model");
const { createOneBook, getAllBooks, getBookById } = Book();

const reqAllBooks = (req, res) => {
  const queryContent = req.query;
  if (Object.keys(queryContent).length !== 0)
    return res.json({ Error: "DB not support Query, please retry" });

  getAllBooks((result) => {
    res.json({ AllBooks: result.rows });
  });
};

const reqBookById = (req, res) => {
  const queryContent = req.query;
  if (Object.keys(queryContent).length !== 0)
    return res.json({ Error: "DB not support Query, please retry" });

  const { id } = req.params;
  getBookById(id, (result) => {
    if (result.rows.length !== 0) res.json({ result: result.rows });
    else res.json({ ERROR: `Book id:${id} not found` });
  });
};

const addNewBook = (req, res) => {
  const newBook = req.body;
  const newBookRequirement = [
    "title",
    "type",
    "author",
    "topic",
    "publicationDate",
  ];

  const hasAllKeys = newBookRequirement.every((item) =>
    newBook.hasOwnProperty(item)
  );

  if (hasAllKeys && Object.keys(newBook).length === newBookRequirement.length)
    createOneBook(newBook, (result) => {
      res.json({ newBook: result.rows });
    });
  else
    res.json({
      ERROR: "Info incorrect, please provide exact object(see requirement)",
      newBookRequirement,
    });
};

module.exports = { reqAllBooks, reqBookById, addNewBook };
