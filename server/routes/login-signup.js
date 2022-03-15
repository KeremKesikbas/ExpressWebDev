var router = require("express").Router();
var bp = require("body-parser");

var db = require("../../lib/database");

var langLoader = require("../../lib/LangLoader");

var userData = {event: ""};

db.createTemplate("users", ["username", "password", "mail"]);

router.get("/", function(req, res) {
    try { 
        if (req.query["lang"]) {
            res.render("login-signup", langLoader.getData(req.query["lang"]));
        }
        
        else res.render("login-signup", langLoader.getDefaultData());
    } catch (error) {
        if (error) console.log(error);
        
        res.end();
    }
});

router.post("/cp", function(req, res, next) {
    try {
        if (req.body) {
            db.useTable("users");

            var data = JSON.parse(JSON.stringify(req.body));
            
            var control = true;

            if (data["type"] == "signup") {
                Object.values(data).forEach(function(e) {
                    if (e == "") control = false;

                    //@todo check sql injection for all elements
                })

                if (control) {
                    if (data["confirmPassword"] != data["password"]) {
                        control = false;
                    }

                    db.selectItem("username", data["username"], function(err, rows) {
                        if (rows) {
                            control = false;

                            userData = {event: "username_exist"};
                        }
                    });

                    db.selectItem("email", data["email"], function(err, rows) {
                        if (rows) {
                            control = false;

                            userData = {event: "email_exist"};
                        }
                    });
                }

                if (control) {
                    db.insertItemT([data["username"], data["password"], data["email"]]);

                    userData = {event: "signup_succes"};
                }
            }

            else if (data["type"] == "login") {
                Object.values(data).forEach(function(e) {
                    if (e == "") control = false;

                    //@todo check sql injection for all elements
                })

                if (control) {

                    db.selectItem("username", data["username"], function(err, rows) {
                        if (!rows) {
                            db.selectItem("email", data["username"], function(err, rows) {
                                if (!rows) {
                                    control = false;

                                    userData = {event: "login_not_match"};
                                }
                            });
                        }
                    });

                    db.selectItem("password", data["password"], function(err, rows) {
                        if (!rows) {
                            control = false;

                            userData = {event: "login_not_match"};
                        }
                    });
                }

                if (control) {
                    userData = {event: "login_succes"};
                }
            }
        }

    } catch (error) {
        if (error) console.log(error);

        res.end();
    }
});

router.get("/cg", function(req, res) {
    try {
        res.json(userData);
    } catch (error) {
        if (error) console.log(error);
        
        res.end();
    }
});

module.exports = router;