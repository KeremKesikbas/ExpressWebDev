var router = require("express").Router();
var bp = require("body-parser");

var db = require("../../lib/database");

var langLoader = require("../../lib/LangLoader");

var userData = {};

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

router.post("/json", function(req, res, next) {
    try {
        if (req.body) {
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
                        }
                    });

                    db.selectItem("email", data["email"], function(err, rows) {
                        if (rows) {
                            control = false;
                        }
                    });
                }

                if (control) {
                    db.insertItemT([data["username"], data["password"], data["email"]]);
                }
            }

            else if (data["type"] == "login") {
                Object.values(data).forEach(function(e) {
                    if (e == "") control = false;

                    //@todo check sql injection for all elements
                })

                if (control) {

                    db.selectItem("username", data["username"], function(err, rows) {
                        if (rows) {
                            control = true;
                        }

                        else {
                            db.selectItem("email", data["username"], function(err, rows) {
                                if (rows) {
                                    control = true;
                                }
                            });
                        }
                    });

                    db.selectItem("password", data["password"], function(err, rows) {
                        if (rows) {
                            control = true;
                        }
                    });
                }

                if (control) {
                    console.log("loggined");
                }
            }
        }

        next();

    } catch (error) {
        if (error) console.log(error);
        
        res.end();
    }
});

router.all("/json", function(req, res) {
    try {
        res.json(userData);
    } catch (error) {
        if (error) console.log(error);
        
        res.end();
    }
});

module.exports = router;