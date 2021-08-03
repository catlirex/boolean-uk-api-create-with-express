const dbClient = require("../../utils/database");
const { buildBackAccountDataBase } = require("../../utils/mockData");

function BankAccount() {
  function createTable() {
    const sql = `
    DROP TABLE IF EXISTS bankAccount;
    CREATE TABLE IF NOT EXISTS bankAccount (
    accountNumber   INT             PRIMARY KEY,
    name            VARCHAR(50)     NOT NULL,
    accountName     VARCHAR(50)     NOT NULL,
    balance         NUMERIC         NOT NULL
  );
`;

    dbClient
      .query(sql)
      .then((result) => console.log("[DB] BankAC table ready."))
      .catch(console.error);
  }

  function mockData() {
    const creatAccount = `
      INSERT INTO bankAccount
        (accountNumber, name, accountName, balance)
      VALUES
        ($1, $2, $3, $4)
    `;

    const bankAccounts = buildBackAccountDataBase();

    bankAccounts.forEach((bankAccount) => {
      dbClient.query(creatAccount, Object.values(bankAccount)).catch.error;
    });
  }

  function getAllAccounts(callBack) {
    const getAllBookSql = `
    SELECT * FROM bankAccount;
    `;

    dbClient.query(getAllBookSql).then((result) => callBack(result)).catch
      .error;
  }

  function getAccountsWithTransactions(id, callback) {
    const getAccountsWithTransactionsSql = `
    SELECT * FROM bankAccount
    WHERE accountnumber = ${id};
    SELECT * FROM transactions
    WHERE accountnumber = ${id};`;

    dbClient
      .query(getAccountsWithTransactionsSql)
      .then((result) => callback(result)).catch.error;
  }

  createTable();
  mockData();

  return { getAllAccounts, getAccountsWithTransactions };
}

module.exports = BankAccount;
