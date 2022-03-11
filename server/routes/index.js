const ll = require("../../lib/LangLoader");
const cm = require("../../lib/Clients");

module.exports = function(app) {
    var router = require("express").Router();

    var homePageURL = "/home";

    router.get("/", function(req, res) {
        try {
            var lang = req.acceptsLanguages(ll.getAcceptedLangs());

            if (!lang) lang = "en";
            ll.setDefaultLang(lang);

            var id = cm.createClient(req.ip, lang);

            res.redirect(homePageURL + "?lang=" + lang + "&id=" + id);
        } catch (error) {
            if (error) console.log(error);
            
            res.end();
        }
    });

    app.use("/", router);
    app.use("/login-signup", require("./login-signup"));
    app.use("/home", require("./home"));
    app.use("/foundations", require("./foundations"));
    app.use("/events", require("./events"));
    app.use("/contact", require("./contact"));
    app.use("/career", require("./career"));
    app.use("/announcements", require("./announcements"));
    app.use("/aboutUs", require("./aboutUs"));
}