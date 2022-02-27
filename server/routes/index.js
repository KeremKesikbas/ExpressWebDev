module.exports = function(app) {
    var router = require("express").Router();
    var bp = require("body-parser");

    var mainPageURL = "/login-signup"

    router.get("/", bp.urlencoded({ extended: false }), function(req, res) {
        res.redirect(mainPageURL);
    });

    app.use("/", router);
    app.use("/login-signup", require("./login-signup"));
}