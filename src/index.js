const express = require("express");
const morgan = require("morgan");

const dbClient = require("./utils/database");
const Book = require("./resources/books/model");
const Pet = require("./resources/pets/model");

/* IMPORT ROUTERS */
const bookRouter = require("./resources/books/router");
const petRouter = require("./resources/pets/router");
const bankAcRouter = require("./resources/bankAccounts/router");
const transactionRouter = require("./resources/transcations/router");

const app = express();

/* SETUP MIDDLEWARE */

app.use(morgan("dev"));
app.use(express.json());

/* SETUP ROUTES */
app.use("/books", bookRouter);
app.use("/pets", petRouter);
app.use("/bankAccounts", bankAcRouter);
app.use("/transactions", transactionRouter);

/* CATCH-ALL TO TEST ROUTES */

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = 3030;

app.listen(port, () => {
  dbClient.connect((error) => {
    if (error) {
      console.error("[ERROR] Connection error: ", error.stack);
    } else {
      console.log("\n[DB] Connected...\n");

      // Book();
      // Pet();
    }
  });

  console.log(`[SERVER] Running on http://localhost:${port}/`);
});
