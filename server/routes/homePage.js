var router = require("express").Router();
var bp = require("body-parser");

router.get("/", bp.urlencoded({ extended: false }), function(req, res, next) {
    res.render("homePage");
});

router.post("/", bp.json(), function(req, res) {
});

module.exports = router;