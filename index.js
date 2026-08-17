const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.get("/", (req, res) => {
  res.send("API de Doações funcionando!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando na porta 3000");
});
