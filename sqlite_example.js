const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

db.serialize(() => {
  db.run("CREATE TABLE langs(name text)");
});

db.serialize(() => {
  db.run(`INSERT INTO langs(name) VALUES(?)`, ["C"], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
});

let sql = `SELECT * FROM langs`;

db.serialize(() => {
  db.get(sql, (err, row) => {
    if (err) {
      throw err;
    }
    console.log(`${row.name}`);
  });
});

// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log("Closed the database connection.");
// });

exports.db = db;
