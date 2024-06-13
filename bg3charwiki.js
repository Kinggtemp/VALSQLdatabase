var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");

var app = express();
app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P3nzanc3!",
  database: "pubs"
});

app.get("/characters", function(req, res) {
  connection.query("SELECT * FROM characters", function(
    error,
    results,
    fields
  ) {
    console.log(error);
    res.json(results);
  });
});

app.get("/characters/:id", function(req, res) {
  console.log(req.params.id);
  let sql = "SELECT * FROM characters WHERE id = '" + req.params.id + "'";
  connection.query(sql, function(error, results, fields) {
    console.log(error);
    res.json(results);
  });
});

app.delete("/characters/:id", function(req, res) {
  let sql = "DELETE FROM characters WHERE id = '" + req.params.id + "'";
  connection.query(sql, function(error, results, fields) {
    res.end("Character removed if it existed");
  });
});

app.post("/characters", function(req, res) {
  let sql = "INSERT INTO characters (displayName,age,nationality)";
  sql =
    sql +
    " VALUES('" +
    req.body.display_name +
    "','" +
    req.body.role +
    "','" +
    req.body.nationality +
    "')";
  console.log(sql);
  connection.query(sql, function(error, results, fields) {
    res.end("added new item");
    console.log(error);
  });
});

var server = app.listen(8082, function() {
  console.log(server.address().address);
  console.log(server.address().port);
});
