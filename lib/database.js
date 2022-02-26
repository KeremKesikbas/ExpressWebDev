const mysql = require('../server/node_modules/mysql2');

const path = require("path");
const fs = require("fs");

function getAccountData() {
  var data = fs.readFileSync(path.join(__dirname + "/../config.json"), {encoding:'utf8', flag:'r'});

  return JSON.parse(data);
}

class Database {

  #db;
  #table;
  #templates;
  #active;

  constructor() {
    var data = getAccountData();

    if (data["use_mysql"] == "false") {
      this.#active = false;
    
      return;
    }

    this.#active = true;

    this.#db = mysql.createConnection({
      host: data["mysql_host"],
      user: data["mysql_username"],
      password: data["mysql_password"],
      database: data["mysql_database"]
    });

    this.#db.connect(function(err) {
      if (err) console.log(err);
    });

    this.#table = null;
  
    this.#templates = {};
  }
  
  /**
   * Creates a column template with specific columns and saves to a list.
   * Templates can be used for database operations.
   * @param {string[]} columns
   */
  createTemplate(columns) {
    if (!this.#active) {
      console.log("Database is not active.");
      return;
    }

    this.#templates[this.#table] = columns;
  }
  
  /**
   * @param {string} table 
   */
  setTable(table) {
    if (!this.#active) {
      console.log("Database is not active.");
      return;
    }

    this.#table = table;
  }

  /**
   * Inserts items with custom columns and values.
   * @param {string[]} columns 
   * @param {string[]} values
   */
  insertItem(columns, values) {
    if (!this.#active) {
      console.log("Database is not active.");
      return;
    }

    if (this.#table == null) {
      console.log("Invalid table");
      return;
    }

    var sql = "INSERT INTO " + this.#table + " ";
  
    var scolumns = "(";
    var sValues = "(";
  
    for (var i = 0; i < columns.length; i++) {
      if (i != columns.length-1) {
        scolumns += columns[i] + ", ";
        sValues += "'" + values[i] + "', ";
      }
  
      else {
        scolumns += columns[i];
        sValues += "'" + values[i] + "'";
      }
    }
  
    scolumns += ")";
    sValues += ")";
  
    sql += scolumns + " VALUES " + sValues;
  
    this.#db.query(sql, function(err, result) {
        if (err) console.log(err);
    });
  }
  
  /**
   * Inserts items with saved templates.
   * @param {string[]} values
   */
   insertItemT(values) {
    if (!this.#active) {
      console.log("Database is not active.");
      return;
    }

    if (this.#table == null) {
      console.log("Invalid table");
      return;
    }

    var columns = this.#templates[this.#table];
  
    var sql = "INSERT INTO " + this.#table + " ";
  
    var scolumns = "(";
    var sValues = "(";
  
    for (var i = 0; i < columns.length; i++) {
      if (i != columns.length-1) {
        scolumns += columns[i] + ", ";
        sValues += "'" + values[i] + "', ";
      }
  
      else {
        scolumns += columns[i];
        sValues += "'" + values[i] + "'";
      }
    }
  
    scolumns += ")";
    sValues += ")";
  
    sql += scolumns + " VALUES " + sValues;

    this.#db.query(sql, function(err, result) {
        if (err) console.log(err);
    });
  }
  
  /**
   * Values can be accessed by column name
   * @param {function} callback selectAll runs this function with row data.
   * @example
   *
   * ```js
   * db.selectAll(function(rows) {
   *  console.log(rows[0]["column"]);
   * });
   * ```
   */
  selectAll(callback) {
    if (!this.#active) {
      console.log("Database is not active.");
      return;
    }

    if (this.#table == null) {
      console.log("Invalid table");
      return;
    }

    var template = this.#templates[this.#table];

    this.#db.query("SELECT * FROM " + this.#table, function (err, rows) {
      if (err) console.log(err);

      var result = [];

      rows.forEach((row) =>{
        var dict = {};

        try {
          dict["id"] = row["id"];
        } catch (error) {}

        for (var i = 1; i <= template.length; i++) {
          dict[template[i-1]] = row[template[i-1]];
        }

        result.push(dict);
      });

      callback(result);
    });
  }

  /**
   * Use id column to update one item
   * @param {string[]} columns 
   * @param {string[]} newValues 
   * @param {string} locationColumn used to find the item to update
   * @param {*} locationValue used to find the item to update
   */
  updateItem(columns, newValues, locationColumn, locationValue) {
    if (!this.#active) {
      console.log("Database is not active.");
      return;
    }

    if (this.#table == null) {
      console.log("Invalid table");
      return;
    }

    var sql = "UPDATE " + this.#table + " SET ";
  
    for (var i = 0; i < columns.length; i++) {
      if (i != columns.length-1) {
        sql += columns[i] + "=" + newValues[i] + ", ";
      }
  
      else {
        sql += columns[i] + "=" + newValues[i];
      }
    }

    if (typeof(locationValue) == "number") {
      sql += " WHERE " + locationColumn + "=" + locationValue;
    }

    else {
      sql += " WHERE " + locationColumn + "='" + locationValue + "'";
    }
  
    this.#db.query(sql, function(err, result) {
        if (err) console.log(err);
    });
  }
  
  /**
   * Inserts items with saved templates.
   * Use id column to update one item
   * @param {string[]} newValues 
   * @param {string} locationColumn used to find the item to update
   * @param {string} locationValue used to find the item to update
   */
   updateItemT(newValues, locationColumn, locationValue) {
    if (!this.#active) {
      console.log("Database is not active.");
      return;
    }

    if (this.#table == null) {
      console.log("Invalid table");
      return;
    }

    var columns = this.#templates[this.#table];

    var sql = "UPDATE " + this.#table + " SET ";

    for (var i = 0; i < columns.length; i++) {
      if (i != columns.length-1) {
        sql += columns[i] + "='" + newValues[i] + "', ";
      }

      else {
        sql += columns[i] + "='" + newValues[i] + "'";
      }
    }

    if (typeof(locationValue) == "number") {
      sql += " WHERE " + locationColumn + "=" + locationValue;
    }

    else {
      sql += " WHERE " + locationColumn + "='" + locationValue + "'";
    }

    this.#db.query(sql, function(err, result) {
        if (err) console.log(err);
    });
  }
}

var database = new Database();

module.exports = {
  database
}