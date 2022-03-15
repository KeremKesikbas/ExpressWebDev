var router = require("express").Router();

var db = require("../../lib/database");

var stateToSend = {};

db.createTemplate("states", ["name", "info", "universities"]);
db.createTemplate("universities", ["name"]);

function parseUnList(universities) {
    if (!universities) {
        return;
    }

    var list = [];

    var university = "";

    for (var i = 0; i < universities.length; i++) {
        if (universities[i] == ",") {
            list.push(university.trim());

            university = "";
        }

        else if (i == universities.length-1) {
            university += universities[i];

            list.push(university.trim());
        }

        else {
            university += universities[i];
        }
    }

    return list;
}

router.get("/", function(req, res) {
    res.render("home");
});

router.post("/cp", function(req, res) {
    try {
        if (req.body) {
            var data = JSON.parse(JSON.stringify(req.body));

            db.useTable("states");

            db.selectItem("name", data["state"], function(err, state) {
                if (!state) {
                    return err;
                }

                var parsedList = [];

                if (state[0]["universities"]) {
                    db.useTable("universities");

                    var unList = parseUnList(state[0]["universities"]);

                    for (var i = 0; i < unList.length; i++) {
                        db.selectItem("name", unList[i], function(err, un) {
                            parsedList.push(JSON.parse(JSON.stringify(un[0])));
                        });
                    }
                }
                // University data transferring is not working correctly
                stateToSend = {"name": state[0]["name"], "info": state[0]["info"], "universities": parsedList};
            });
        }
        
    } catch (error) {
        if (error) console.log(error);

        res.end();
    }
});

router.get("/cg", function(req, res) {
    try {
        res.json(stateToSend);
    } catch (error) {
        if (error) console.log(error);
        
        res.end();
    }
});

module.exports = router;