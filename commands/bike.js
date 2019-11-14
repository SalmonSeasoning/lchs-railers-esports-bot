const Command = require('../command.js'),
    new_command = new Command("bike", (client, message, args) => {
        message.reply("should've pocketed the bike! :bike:");
    });

module.exports = new_command;
