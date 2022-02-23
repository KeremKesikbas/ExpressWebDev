var express = require("express");
var path = require("path");

var db = require("../../lib/database");
    
var router = express.Router();

path = "path/to/.sqlite";

router.get("/", function(req, res) {

    db.connect(path);

    res.end();
});

module.exports = router;