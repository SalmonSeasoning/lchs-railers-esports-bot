const { Command } = require("../classes/command");
const { ternaryIf } = require("../utils");

new Command("repo", {
    callee: (message, database, client) => {
        message.reply('https://github.com/SalmonSeasoning/lchs-railers-esports-bot');
    },
    description: "Get the repository link"
});
