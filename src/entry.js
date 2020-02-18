// Include necessary modules
const Discord = require('discord.js');
const { Database } = require("./classes/database");
const { ClientHandler } = require("./classes/client_handler");
const { ternaryIf, readIfExistsSync } = require("./utils.js");

// g_ = Global variable prefix (see Systems Hungarian Notation)
var g_database = null;
var g_administrators = [];

// Configure the bot
const g_fsConfig = readIfExistsSync("./config.json");
const g_config = g_fsConfig ? JSON.parse(g_fsConfig) : ()=>{
    console.error("Could not load config.json! Cannot start..");
    console.info("You can generate a config.json file by running : npm run gen-config");
    process.exit(0);
};
if (g_config["database"])
{
    let dbData = ["localhost", "root", "password", "database"];
    dbData[0] = ternaryIf(g_config["database"]["host"], dbData[0]);
    dbData[1] = ternaryIf(g_config["database"]["username"], dbData[1]);
    dbData[2] = ternaryIf(g_config["database"]["password"], dbData[2]);
    dbData[3] = ternaryIf(g_config["database"]["database"], dbData[3]);
    g_database = new Database(...dbData); // new Database(dbData[0], dbData[1], dbData[2], dbData[3]);
    console.log(`Interpreted database connection to be : { ${dbData[0]}, ${dbData[1]}, ${dbData[3]} }`);
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
}
// set all the admin uids in the config
if(g_config["administrator_uids"])
    for(uid in g_config["administrator_uids"])
    {
        console.log(`Found administrator UID : ${g_config["administrator_uids"][uid]}`);
        g_administrators[uid] = g_config["administrator_uids"][uid];

    }

// set the bot prefix
const g_botPrefix = ternaryIf(g_config["global_prefix"], "!"); // can also do: g_botPrefix = g_config["global_prefix"] || "!";

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
    if(g_config["presence"])
    switch(g_config["presence"].toLowerCase())
    {
        case "online":
            console.log("Set status to online");
            g_client.user.setStatus("online");
            break;
        case "idle":
            console.log("Set status to idle");
            g_client.user.setStatus("idle");
            break;
        case "dnd":
            console.log("Set status to do not disturb");
            g_client.user.setStatus("dnd");
            break;
        case "offline":
            console.log("Set status to offline");
            g_client.user.setStatus("invisible");
            break;
        default:
            console.log("Set default status");
            g_client.user.setStatus("online");
    }
    // set the activity (i.e. User PLAYING !help)
    if(g_config["activity"])
    {
        console.log(`Set activity to : ${g_config["activity"]}`);
        g_client.user.setActivity(g_config["activity"]);
    }
    else
    {
        console.log("Set default activity");
        g_client.user.setActivity(`${g_botPrefix}help`);
    }
    console.log("Ready!");
});

// Bind the command handler to the message event
g_client.on("message", (message)=>g_clientHandler.handleCommand(message));

// check config for bot token
if(g_config["private_token"]) g_client.login(g_config["private_token"]);
// check environment variables for bot token
else if(process.env.TOKEN) g_client.login(process.env.TOKEN);
// assume no token
else
{
    console.error("No token found! Cannot start the bot!");
    process.exit(0);
}
