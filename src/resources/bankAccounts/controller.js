const BankAccount = require("./model");
const { getAllAccounts } = BankAccount();

const findAllBooks = (req, res) => {
  getAllAccounts((result) => {
    res.json({ result: result.rows });
  });
};

module.exports = { findAllBooks };
