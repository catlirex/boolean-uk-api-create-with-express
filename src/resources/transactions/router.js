const express = require("express");
const transactionRouter = express.Router();
const { reqAllTransaction, reqTransactionById } = require("./controller");

transactionRouter.get("/", reqAllTransaction);

transactionRouter.get("/:id", reqTransactionById);

module.exports = transactionRouter;
