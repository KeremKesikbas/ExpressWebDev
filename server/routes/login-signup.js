var router = require("express").Router();
var bp = require("body-parser");

var db = require("../../lib/database");

router.get("/", bp.urlencoded({ extended: false }), function(req, res) {
    res.render("login-signup");
});

router.post("/", bp.json(), function(req, res) {
    if (req.body) {
        var data = JSON.parse(JSON.stringify(req.body));

        //@todo add security elements

        if (data["email"]) {
            console.log(data["username"] + " " + data["password"] + " " + data["email"]);
        }

        else {
            console.log(data["username"] + " " + data["password"]);
        }
    }
});

module.exports = router;