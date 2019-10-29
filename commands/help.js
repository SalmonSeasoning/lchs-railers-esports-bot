const Command = require('../command.js'),
    new_command = new Command("help", (client, message, args) => {
        message.author.send(`List of commands:\n\`\`\`\n${Command.getCommandNames().join('\n')}\`\`\``);
    });

module.exports = new_command;