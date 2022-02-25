const sqlite3 = require('../server/node_modules/mysql/index')

let db

function connect(path) {
  /*var db = mysql.createConnection({
    host: "localhost",
    user: "yourusername",
    password: "yourpassword"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });*/
}

function close() {
}

module.exports = {
  connect,
  close
}