const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const DB = require("./Index");
const route = express.Router();
DB.all("SELECT * FROM anonymous", [], (err, rows) => {
  if (err) return console.log(err.message);
  rows.forEach((item) => {
    console.log(item);
  });
});
let sql;
route.use(bodyParser.json({ limit: "100mb" }));
route.use(cors());

route.get("/get", (req, res) => {
  sql = "SELECT * FROM anonymous";
  DB.all(sql, [], (err, rows) => {
    if (err) return console.log(err);
    res
      .status(200)
      .json({ message: "Welcome to my API", success: true, data: rows });
  });
});

route.post("/post", (req, res) => {
  let { name, email, password } = req.body;
  sql = "INSERT INTO anonymous(name, email, password) VALUES (?, ?, ?)";
  DB.run(sql, [name, email, password], (err) => {
    if (err) return console.log(err.message);
    res.status(200).json({ message: req.body });
  });
});
route.put("/update", (req, res) => {
  let [prop, value] = req.body.data;
  let id = req.body.id;
  console.log(prop, value, id);
  if (id) {
    switch (prop) {
      case "name":
        sql = "UPDATE anonymous SET name = ? WHERE id = ?";
        break;
      case "email":
        sql = "UPDATE anonymous SET email = ? WHERE id = ?";
        break;
      case "password":
        sql = "UPDATE anonymous SET password = ? WHERE id = ?";
        break;
      default:
        sql = "UPDATE anonymous SET name = ? WHERE id = ?";
    }
    DB.run(sql, [value, id], (err) => {
      if (err) return console.log(err.message);
      res.status(200).json({ message: req.body });
    });
  }
});
route.delete("/delete", (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  if (id) {
    sql = "DELETE FROM anonymous WHERE id = ?";
    DB.run(sql, [id], (err) => {
      if (err) return console.log(err);
      res.status(200).json({ message: "User deleted", success: true });
    });
  }
});
module.exports = route;
