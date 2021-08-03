const express = require("express");
const bankAcRouter = express.Router();
const { findAllBooks } = require("./controller");

bankAcRouter.get("/", findAllBooks);

module.exports = bankAcRouter;
