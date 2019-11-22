// Globals
const Discord = require('discord.js'),
    client = new Discord.Client(),
    Command = require('./command.js'),
    fs = require('fs'),
    utilities = require('./utilities.js'),
    database = require("./database.js"),
    dbConnection = database.createConnection(),
    __PREFIX__ = process.env.PREFIX || process.env.BOT_PREFIX || "!",
    __TOKEN__ = process.env.TOKEN || process.env.BOT_TOKEN;

if(!utilities.TextIsValid(__PREFIX__)) throw(new Error("A prefix was not supplied!"));
if(!utilities.TextIsValid(__TOKEN__)) throw(new Error("A token was not supplied!"));

// Include the new commands (synchronously)
fs.readdirSync('./commands').forEach(fileName=>{
    // Only include if it's a .js file
    if(fileName.substring(fileName.length, fileName.length - 3) === '.js')
    require(`./commands/${fileName}`);
});

client.on('ready', () => {
    client.user.setActivity(`${__PREFIX}help`);
    console.log('The bot is online and connected to the database!');
});

client.on('reconnecting', () => {
    console.log('Disconnected! Attempting to reconnect!');
});

client.on('disconnect', () => {
    throw(new Error('Failed to connect to Discord servers...'));
});

// temporary array for admins (just for testing)
var adminArray = [];
var sqlUsersArray = [];

client.on('message', (message) => {
    
    if(!message.guild || message.author.bot || message.system) return;
    
    if(sqlUsersArray.includes(message.author.id)){
        // User exists, go ahead and add 2 XP for the message
        database.getUserLevel(dbConnection, message.author.id).then((xp)=>{
            database.setUserLevel(dbConnection, message.author.id, xp + 2);
        });
    }else
    {
        // add the user to the database
    }
    
    
    // Command handling
    if(message.cleanContent.toLowerCase().startsWith(__PREFIX__)) {
        const commandName = message.cleanContent.split(' ')[0].substring(__PREFIX__.length);
        const selectedCommand = Command.getCommandByName(commandName.toLowerCase());
        if (selectedCommand) {
            if(!selectedCommand.isActiveCommand)
                return message.reply('**That command is disabled!**');
            else if(selectedCommand.requiresElevation && !adminArray.includes(message.author.id))
                return message.reply('You do not have permission to run this command!');
            const args = message.cleanContent.split(' ').shift();
            // if you want to use database.js functions, include it in the command file
            // if you aren't touching a database, don't accept dbConnection parameter
            selectedCommand.func(client, message, args, dbConnection);
        }
    }
});

// If can connect to database, login to Discord
database.connect(dbConnection)
    .then(() => client.login(__TOKEN__), (err) => {
        console.error("Unsuccessful database connection.");
        console.error(`${err}`);
        process.exit(-1);
    });
