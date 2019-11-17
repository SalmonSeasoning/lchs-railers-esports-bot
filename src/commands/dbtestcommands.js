const Command = require("../command.js");
const database = require("../database.js");

module.exports.doesDatabaseExist = new Command("doesdbexist", (client, message, args, db) => {
    database.doesDatabaseExist(db)
    .then((res) => {message.channel.send(`Database does ${(res) ? "" : "not "}exist.`)})
    .catch((e) => {message.channel.send(`Error: ${e}`)});
}, false, true);