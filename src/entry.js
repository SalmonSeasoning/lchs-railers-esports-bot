// Globals
const Discord = require('discord.js'),
    client = new Discord.Client(),
    Command = require('./command.js'),
    fs = require('fs'),
    utilities = require('./utilities.js'),
    database = require("./database.js"),
    dbConnection = database.createConnection(),
    __PREFIX__ = process.env.PREFIX || process.env.BOT_PREFIX || "!",
    __TOKEN__ = process.env.TOKEN || process.env.BOT_TOKEN,
    Leveling = require('./levels.js'); // leveling algorithm

if(!utilities.TextIsValid(__PREFIX__)) throw(new Error("A prefix was not supplied!"));
if(!utilities.TextIsValid(__TOKEN__)) throw(new Error("A token was not supplied!"));

// Include the new commands (synchronously)
fs.readdirSync('./commands').forEach(fileName=>{
    // Only include if it's a .js file
    if(fileName.substring(fileName.length, fileName.length - 3) === '.js')
    require(`./commands/${fileName}`);
});

client.on('ready', () => {
    client.user.setActivity(`${__PREFIX__}help`);
    console.log('The bot is online and connected to the database!');
});

client.on('reconnecting', () => {
    console.log('Disconnected! Attempting to reconnect!');
});

client.on('disconnect', () => {
    throw(new Error('Failed to connect to Discord servers...'));
});

client.on('message', (message) => {
    
    if(!message.guild || message.author.bot || message.system) return;

    // valid message | this is the function that should handle level stuff.
    Leveling.LevelUp(message, database, dbConnection);
    
    // Command handling
    if(message.cleanContent.toLowerCase().startsWith(__PREFIX__)) { // <== this line right here might get bottlenecked with spam
        // Get the name of the command from the message
        const commandName = message.cleanContent.split(' ')[0].substring(__PREFIX__.length);
        // Search for the command. This will be null if it does not exist
        const selectedCommand = Command.getCommandByName(commandName.toLowerCase());
        if (selectedCommand) RunCommand(selectedCommand, message);
        return;
    }
    
});

// If can connect to database, login to Discord
database.connect(dbConnection)
    .then(() => client.login(__TOKEN__), (err) => {
        console.error("Unsuccessful database connection.");
        console.error(`${err}`);
        process.exit(-1);
    });


// A more organized method of running commands
function RunCommand(selectedCommand, message)
{
    if(selectedCommand.isActiveCommand)
    {
        // if admin not required or it is required and the user is also an admin
        if(!selectedCommand.requiresElevation || selectedCommand.requiresElevation && database.isUserAdmin(dbConnection, message.author.id))
        {
            // get arguments from message object
            const args = message.cleanContent.split(' ').shift();
            // forward client object, message object, arguments, and the dbConnection
            return selectedCommand.func(client, message, args, database, dbConnection);
        }
        else
        {
            return message.reply('You cannot run this command!');
        }
    }
    else
    {
        return message.reply('That command is currently disabled.');
    }
}
