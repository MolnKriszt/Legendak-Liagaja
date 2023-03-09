require("dotenv").config();

const express = require('express');
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require('sanitize-html');


const pool = require("./config/database.js");

app.get("/players", (req, res) => {

  pool.getConnection(function (error, connection) {
    if (error) {
      console.log("server error");
      return;
    }
    const sql = "SELECT * FROM players";
    connection.query(sql, (error, results, fields) => {
      if (error) {
        console.log("sql error");
        return;
      }
      res.send(results);
    });
    connection.release();
  });
});

app.get("/players/:id",(req, res)=>{
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      console.log("server error");
      return;
    }
  const sql = `
  SELECT * FROM players
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      if (error) {
        console.log("sql error");
        return;
      }
      res.send(results[0]);
    });
    connection.release();
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
