const { Command } = require("../classes/command");
const { ternaryIf } = require("../utils");

new Command("ping", {
    callee: (message, database, client) => {
        message.reply(`:ping_pong: ${client.ping}ms`);
    },
    description: "Check the ping to Discord"
});
