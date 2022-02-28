module.exports = function(app) {
    var router = require("express").Router();
    var bp = require("body-parser");

    var homePageURL = "/home";

    router.get("/", bp.urlencoded({ extended: false }), function(req, res) {
        res.redirect(homePageURL);
    });

    app.use("/", router);
    app.use("/login-signup", require("./login-signup"));
    app.use("/home", require("./homePage"));
}