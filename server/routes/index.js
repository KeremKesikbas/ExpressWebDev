var express = require("express");
var path = require("path");

var router = express.Router();

html_path = path.join(__dirname + "/../../resources/");

router.get("/", function(req, res) {
    res.sendFile(path.join(html_path + "index.html"));
});

module.exports = router;