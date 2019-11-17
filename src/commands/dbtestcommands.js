const Command = require("../command.js");
const database = require("../database.js");

//Should these commands require admin?
//In a testing environment where the database gets wiped frequently, this should be set to false
//In production, this should be set to true.
const admin = false;

module.exports.doesDatabaseExist = new Command("doesdbexist", (client, message, args, db) => {
    database.doesDatabaseExist(db)
    .then((res) => {message.channel.send(`Database does ${(res) ? "" : "not "}exist.`)})
    .catch((e) => {message.channel.send(`Error: ${e}`)});
}, admin, true);

module.exports.dotablesexist = new Command("doesleveltableexist", (client, message, args, db) => {
    database.doesLevelTableExist(db)
    .then((res) => {message.channel.send(`Level table does ${(res) ? "" : "not "}exist.`)})
    .catch((e) => {message.channel.send(`Error: ${e}`)});

    database.doesAdminTableExist(db)
    .then((res) => {message.channel.send(`Admin table does ${(res) ? "" : "not "}exist.`)})
    .catch((e) => {message.channel.send(`Error: ${e}`)});

    database.doesCosmeticTableExist(db)
    .then((res) => {message.channel.send(`Cosmetic table does ${(res) ? "" : "not "}exist.`)})
    .catch((e) => {message.channel.send(`Error: ${e}`)});
}, admin, true);