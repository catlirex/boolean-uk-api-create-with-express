const Transactions = require("./model");
const { getAllTransactions, getTransactionsById } = Transactions();

const reqAllTransaction = (req, res) => {
  getAllTransactions((result) => {
    res.json({ result: result.rows });
  });
};

const reqTransactionById = (req, res) => {
  const id = req.params.id;
  getTransactionsById(id, (result) => {
    res.json({ result: result.rows });
  });
};

module.exports = { reqAllTransaction, reqTransactionById };
