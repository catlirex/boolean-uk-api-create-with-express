const dbClient = require("../../utils/database");
const { buildTransactionDataBase } = require("../../utils/mockData");

function Transactions() {
  function createTable() {
    const sql = `
     
        DROP TABLE IF EXISTS transactions;
        CREATE TABLE IF NOT EXISTS transactions (
        transactionId       VARCHAR(255)    PRIMARY KEY,
        date                DATE            NOT NULL,
        accountNumber       INT             NOT NULL,
        transactionType     VARCHAR(255)    NOT NULL,
        amount              NUMERIC         NOT NULL,
        paymentAccountNumber INT            NOT NULL
      );
    `;

    dbClient
      .query(sql)
      .then((result) => console.log("[DB] Transactions table ready."))
      .catch(console.error);
  }

  function mockData() {
    const createTransaction = `
      INSERT INTO transactions
        (transactionId, date, accountNumber, transactionType, amount, paymentAccountNumber )
      VALUES
        ($1, $2, $3, $4, $5, $6);
    `;
    const getAccountNumber = `
    SELECT accountnumber FROM bankAccount;`;

    dbClient.query(getAccountNumber).then((result) => {
      const transactions = buildTransactionDataBase(result.rows);

      transactions.forEach((transaction) => {
        dbClient.query(createTransaction, Object.values(transaction));
      });
    });
  }

  function getAllTransactions(callback) {
    const getAllTransactionSql = `
    SELECT * FROM transactions;
    `;

    dbClient
      .query(getAllTransactionSql)
      .then((result) => callback(result))
      .catch((error) => console.log(error));
  }

  function getTransactionsById(id, callback) {
    const getTransactionsByIdSql = `
    SELECT * FROM transactions
    WHERE id = ${id};`;

    dbClient.query(getTransactionsByIdSql).then((result) => callback(result))
      .catch.error;
  }

  createTable();
  mockData();

  return { getAllTransactions, getTransactionsById };
}

module.exports = Transactions;
