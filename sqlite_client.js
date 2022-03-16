let my_import = require("./sqlite_example");

let db = my_import.db;

console.log(db);

let sql = `SELECT * FROM langs`;

db.each(sql, ["USA"], (err, row) => {
  if (err) {
    throw err;
  }
  console.log(`${row.firstName} ${row.lastName} - ${row.email}`);
});
