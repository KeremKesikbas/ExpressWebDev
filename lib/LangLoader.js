const path = require("path");
const fs = require("fs");

function loadLangData() {
    var langPath = path.join(__dirname + "/../languages");

    var files = fs.readdirSync(langPath);

    var languages = [];

    files.forEach(function(lang) {
        var data = JSON.parse(fs.readFileSync(path.join(langPath + "/" + lang), {encoding:'utf8', flag:'r'}));

        var temp = "";

        Object.keys(data).forEach(function(key) {
            value = data[key];

            for (var l of value) {
                if (l == " ") temp += " ";
                else temp += l;
            }

            data[key] = temp;
            
            temp = "";
        });

        languages.push(data);
    });

    return languages;
  }

class LangLoader {
    #languages
    #default

    constructor() {
        this.#languages = loadLangData();
    }

    /**
     * @param {string} language_code
     * @return {*} returns data of language
     */
    getData(language_code) {
        var result;

        this.#languages.forEach(element => {
            if (element["language_code"] == language_code) {
                result = element;
            }
        });

        return result;
    }

    getAcceptedLangs() {
        var result = [];

        this.#languages.forEach(element => {
            result.push(element["language_code"]);
        });

        return result;
    }

    getDefaultData() {
        return this.getData(this.#default);
    }

    getDefaultLang() {
        return this.#default;
    }

    setDefaultLang(defaultLang) {
        var result = "en";

        this.#languages.forEach(element => {
            if (element["language_code"] == defaultLang) {
                result = defaultLang;
            }
        });

        this.#default = result;
    }
}

var ll = new LangLoader();

module.exports = ll;