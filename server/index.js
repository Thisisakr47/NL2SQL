const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//routers
app.get("/databases", async (req, res) => {
  try {
    const alldb = await pool.query(`SELECT datname FROM pg_database;`);
    res.json(alldb.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/databases/tables", async (req, res) => {
  try {
    const allTables = await pool.query(
      `SELECT * FROM information_schema.tables WHERE table_schema = 'public';`
    );
    res.json(allTables.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/databases/tables/records", async (req, res) => {
  try {
    const table = req.query.tableName;
    const Query = `SELECT * FROM ${table} LIMIT 10`;
    const allRecords = await pool.query(Query);
    res.json(allRecords.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/input", async (req, res) => {
  try {
    const enteredQuery = req.query.sendInput;
    const allRecords = await pool.query(enteredQuery);
    res.json(allRecords.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {});