var express = require("express");

var db = require("../../lib/database");
    
var router = express.Router();

db_path = __dirname + "\\..\\database.db";

console.log(db_path);

router.get("/", function(req, res) {

    db.connect(db_path);

    res.end();
});

module.exports = router;