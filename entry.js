// Globals
const Discord = require('discord.js'),
    client = new Discord.Client(),
    Command = require('./command.js'),
    utilities = require('./utilities.js'),
    database = require("./database.js"),
    dbConnection = database.createConnection(),
    __PREFIX__ = process.env.PREFIX || process.env.BOT_PREFIX,
    __TOKEN__ = process.env.TOKEN || process.env.BOT_TOKEN;

if(!utilities.TextIsValid(__PREFIX__)) throw(new Error("A prefix was not supplied!"));
if(!utilities.TextIsValid(__TOKEN__)) throw(new Error("A token was not supplied!"));

// Include the new commands
require('./commands/ping.js');
require('./commands/help.js');
require('./commands/bike.js');
require('./commands/channel.js');

client.on('ready', () => {
    console.log('The bot is online!');

    database.connect(dbConnection)
    .then(() => console.log("Connection to database successful"))
    .catch((err) => {throw(err)});
});

client.on('reconnecting', () => {
    console.log('Disconnected! Attempting to reconnect!');
});

client.on('disconnect', () => {
    throw(new Error('Failed to connect to Discord servers...'));
});

// temporary array for admins
var adminArray = [];

client.on('message', (message) => {
    // Command handling
    if(message.cleanContent.toLowerCase().startsWith(__PREFIX__)) {
        const commandName = message.cleanContent.split(' ')[0].substring(__PREFIX__.length);
        const selectedCommand = Command.getCommandByName(commandName.toLowerCase());
        if(selectedCommand.isActiveCommand)
            return message.reply('**That command is disabled!**');
        if(selectedCommand.requiresElevation && !adminArray.includes(message.author.id))
            return message.reply('You do not have permission to run this command!');
        if (selectedCommand) {
            const args = message.cleanContent.split(' ').shift();
            selectedCommand.func(client, message, args);
        }
    }
});

client.login(__TOKEN__);
