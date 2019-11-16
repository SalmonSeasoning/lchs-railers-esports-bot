const Command = require('../command.js'),
    new_command = new Command("gamer", (client, message, args) => {
        message.reply(`You are ${Math.floor(Math.random() * 100) + 1}% gamer.`);
    });

module.exports = new_command;
