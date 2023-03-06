const sqlite3 = require("sqlite3").verbose();
const DB = new sqlite3.Database("./Test.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.log(err);
});

module.exports = DB;
