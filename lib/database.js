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

  constructor() {
    var data = getAccountData();

    this.#db = mysql.createConnection({
      host: data["mysql_host"],
      user: data["mysql_username"],
      password: data["mysql_password"],
      database: data["mysql_database"]
    });

    this.#db.connect(function(err) {
      if (err) throw err;
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
    this.#templates[this.#table] = columns;
  }
  
  /**
   * @param {string} table 
   */
  setTable(table) {
    this.#table = table;
  }

  /**
   * Inserts items with custom columns and values.
   * @param {string[]} columns 
   * @param {string[]} values
   */
  insertItem(columns, values) {
  
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
        if (err) throw err;
    });
  }
  
  /**
   * Inserts items with saved templates.
   * @param {string[]} values
   */
   insertItemT(values) {
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
        if (err) throw err;
    });
  }
  
  /**
   * Values can be accessed by column name
   * @return {dictionary} all items in the table
   */
  selectAll() {
    var dResult = {};

    this.#db.query("SELECT * FROM " + this.#table, function (err, result, fields) {
      if (err) throw err;

      for (const [key, value] of Object.entries(result)) {
        dResult[key] = value;
      }
    });

    return dResult;
  }
  
  /**
   * Use id column to update one item
   * @param {string[]} columns 
   * @param {string[]} newValues 
   * @param {string} locationColumn used to find the item to update
   * @param {*} locationValue used to find the item to update
   */
  updateItem(columns, newValues, locationColumn, locationValue) {
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
        if (err) throw err;
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
        if (err) throw err;
    });
  }
}

var database = new Database();

module.exports = {
  database
}