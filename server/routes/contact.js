var router = require("express").Router();

router.get("/", function(req, res, next) {
    res.render("contact");
});

router.post("/", function(req, res) {
});

module.exports = router;