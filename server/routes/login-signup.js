var router = require("express").Router();
var bp = require("body-parser");

var db = require("../../lib/database");

var langLoader = require("../../lib/LangLoader");

var userData = {};

router.get("/", bp.urlencoded({ extended: false }), function(req, res) {
    res.render("login-signup", langLoader.getData("tr"));
});

router.get("/json", bp.urlencoded({ extended: false }), function(req, res) {
    res.json(userData);
});

router.post("/json", bp.json(), function(req, res) {
    if (req.body) {
        var data = JSON.parse(JSON.stringify(req.body));

        //@todo add security elements

        if (data["email"]) {
            //db.insertItemJ(data);
        }

        else {
            //db.search(data);
        }
    }

    userData = data;
});

module.exports = router;