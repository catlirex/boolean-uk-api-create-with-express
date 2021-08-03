const express = require("express");
const bankAcRouter = express.Router();
const {
  findAllAccounts,
  findAccountsWithTransactions,
} = require("./controller");

bankAcRouter.get("/", findAllAccounts);

bankAcRouter.get("/:id/transactions", findAccountsWithTransactions);

module.exports = bankAcRouter;
