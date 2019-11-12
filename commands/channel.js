const Command = require('../command.js'),
    new_command = new Command("ping", (client, message, args) => {
        message.reply(`PONG! ${client.ping}ms!`);
    });

module.exports = new_command;
