const express = require("express");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Rota raiz
app.get("/", (req, res) => {
  res.send("API de Doações funcionando!");
});

// Endpoint para registrar uma doação
app.post("/doacoes", async (req, res) => {
  const { nome, valor } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO doacoes (nome, valor) VALUES ($1, $2) RETURNING *",
      [nome, valor]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao registrar doação");
  }
});

// Endpoint para listar todas as doações
app.get("/doacoes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM doacoes");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar doações");
  }
});

// Inicialização do servidor
app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando na porta 3000");
});
