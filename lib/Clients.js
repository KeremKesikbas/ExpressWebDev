
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

class Client {
    constructor(ip, lang, username) {
        this.ip = ip;
        this.lang = lang;
        this.username = username;
    }
}

class Manager {
    #assignedIDs
    #clients // id - Client object
    
    constructor() {
        this.#clients = {};
        this.#assignedIDs = [];
    }

    /**
     * @param {Int32Array} ip y
     * @param {string} lang 
     * @param {string} username - default guest
     * @returns client id
     */
    createClient(ip, lang, username="%guest%") {
        var id = randomInt(100000, 999999);

        while (true) {
            var control = false;

            this.#assignedIDs.forEach(function(e) {
                if (id == e) {
                    control = true;
                }
            });

            if (control) id = randomInt(100000, 999999);
            else { break; }
        }

        this.#assignedIDs.push(id);

        if (username == "%guest%") {
            username = "Guest_" + id;
        }

        this.#clients[id] = new Client(ip, lang, username);

        return id;
    }

    getClient(id) {
        return this.#clients[id];
    }
}

var clientManager = new Manager();

module.exports = clientManager;