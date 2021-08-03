const dbClient = require("../../utils/database");
const { buildBooksDatabase } = require("../../utils/mockData");

function Book() {
  function createTable() {
    const sql = `
    DROP TABLE IF EXISTS books;      
      CREATE TABLE IF NOT EXISTS books (
        id              SERIAL        PRIMARY KEY,
        title           VARCHAR(255)   NOT NULL,
        type            VARCHAR(255)   NOT NULL,
        author          VARCHAR(255)   NOT NULL,
        topic           VARCHAR(255)   NOT NULL,
        publicationDate DATE           NOT NULL
      );
    `;

    dbClient
      .query(sql)
      .then((result) => console.log("[DB] Book table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createBook = `
      INSERT INTO books
        (title, type, author, topic, publicationDate)
      VALUES
        ($1, $2, $3, $4, $5)
    `;

    const books = buildBooksDatabase();

    books.forEach((book) => {
      dbClient.query(createBook, Object.values(book)).catch.error;
    });
  }

  function getAllBooks(callBack) {
    const getAllBookSql = `
    SELECT * FROM books;
    `;

    dbClient.query(getAllBookSql).then((result) => callBack(result)).catch
      .error;
  }

  function createOneBook(newBook, callback) {
    const { title, type, author, topic, publicationDate } = newBook;
    const createBookSql = `
    INSERT INTO books (title, type, author, topic, publicationDate)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

    dbClient
      .query(createBookSql, [title, type, author, topic, publicationDate])
      .then((result) => callback(result))
      .catch((error) => console.log(error));
  }

  function getBookById(id, callback) {
    const getBookSql = `
    SELECT * FROM Books
    WHERE id = ${id};`;

    dbClient.query(getBookSql).then((result) => callback(result)).catch.error;
  }

  createTable();
  mockData();

  return { createOneBook, getAllBooks, getBookById };
}

module.exports = Book;
