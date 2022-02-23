const sqlite3 = require('../server/node_modules/sqlite3/sqlite3').verbose()

let db;

/**
 * Connects to the database
 * @param {string} path database locations
 */

function connect(path) {
  db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }

    else {
      console.log("Connected to the database..");
    }
  });
}

function close() {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }

    else {
      console.log("Closed the database connection.");
    }
  });
}

module.exports = {
  connect
}