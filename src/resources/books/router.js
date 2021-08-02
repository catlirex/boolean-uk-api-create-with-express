const express = require("express");
const bookRouter = express.Router();

const { reqAllBooks, reqBookById, addNewBook } = require("./controller");

bookRouter.get("/", reqAllBooks);
bookRouter.get("/:id", reqBookById);
bookRouter.post("/", addNewBook);

module.exports = bookRouter;
