const express = require("express");
const port = 3000;

const pg = require("pg");
const pool = new pg.Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const app = express();
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  next();
})

app.get("/", async (req, res) => {
  const result = await pool.query(`
  SELECT message
  FROM messages
  ORDER BY id DESC
  LIMIT 1
`);

  res.send(result.rows[0].message);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
