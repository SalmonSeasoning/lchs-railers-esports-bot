const Command = require('../command.js'),
    new_command = new Command("repo", (client, message, args) => {
        message.reply('https://github.com/SalmonSeasoning/lchs-railers-esports-bot');
    });

module.exports = new_command;
