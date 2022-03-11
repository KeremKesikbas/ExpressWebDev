var router = require("express").Router();

router.get("/", function(req, res, next) {
    res.render("events");
});

router.post("/", function(req, res) {
});

module.exports = router;