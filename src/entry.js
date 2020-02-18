// Include necessary modules
const Discord = require('discord.js');
const { Database } = require("./classes/database");
const { ClientHandler } = require("./classes/client_handler");
const { ternaryIf, readIfExistsSync } = require("./utils.js");

// g_ = Global variable prefix (see Systems Hungarian Notation)
var g_database = new Database(
    process.env.DB_HOST || "mysql",
    process.env.DB_USER || "root",
    process.env.DB_PASS || "railerbot",
    process.env.DB_NAME || "railer-db",
    multipleStatements:true
);

var g_administrators = ['311296013178503188','171717502911381505']; // default administrators

console.info("NOTICE: Unhandled promise rejections exceptions are from the MySQL module! Please disregard them for now...");
g_database.connect().then(()=>{
    // connected to the database
    console.log("Successfully connected to the database!");
    g_database.query(`USE ${g_database.dbname}`); // dont rely on this
}, (err)=>{
    // not connected to the database
    console.warn("Could not to connect to the database!");
    console.warn(err);
});

// set the bot prefix
const g_botPrefix = process.env.PREFIX || process.env.BOT_PREFIX || "!"

// Discord.js Client
const g_client = new Discord.Client();

// Include all the commands from the "commands" directory
require("fs").readdirSync("./src/commands").forEach(fileName => {
    if (fileName.substring(fileName.length, fileName.length - 3) === ".js") // only include if the file has a .js extension
    {
        console.log(`Found command file: ${fileName}`);
        require(`./commands/${fileName}`);
    }
});

// Client handler -- handles information from Discord.js client
const g_clientHandler = new ClientHandler(g_client, g_botPrefix, g_database, ...g_administrators);

// bot is online
g_client.on("ready", ()=>{
    // set the bot status (online, idle, dnd, offline)
    client.user.setActivity(`${g_botPrefix}help`);
    console.log("Ready!");
});

// Bind the command handler to the message event
g_client.on("message", (message)=>g_clientHandler.handleCommand(message));

if(process.env.TOKEN) g_client.login(process.env.TOKEN);
else if(process.env.BOT_TOKEN) g_client.login(process.env.BOT_TOKEN);
else
{
    console.error("No token found! Cannot start the bot!");
    process.exit(0);
}
