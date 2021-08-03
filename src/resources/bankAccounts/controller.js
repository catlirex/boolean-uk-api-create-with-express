const BankAccount = require("./model");
const { getAllAccounts, getAccountsWithTransactions } = BankAccount();

const findAllAccounts = (req, res) => {
  getAllAccounts((result) => {
    res.json({ result: result.rows });
  });
};

const findAccountsWithTransactions = (req, res) => {
  const id = req.params.id;
  getAccountsWithTransactions(id, (result) => {
    if (result[0].rows.length === 0)
      return res.json({ ERROR: `Account ${id} NOT FOUND` });
    if (result[1].rows.length === 0)
      return res.json({
        AccountDetail: result[0].rows,
        Transactions: result[1].rows,
        MSG: "NO PAST TRANSACTION",
      });
    res.json({ AccountDetail: result[0].rows, Transactions: result[1].rows });
  });
};

module.exports = { findAllAccounts, findAccountsWithTransactions };
