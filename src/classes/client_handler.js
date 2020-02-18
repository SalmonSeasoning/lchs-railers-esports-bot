const {Command} = require("./command");


// controls Discord.js client events
class ClientHandler {
    constructor(client, defaultPrefix, database, administrators)
    {
        this.client = client;
        this.defaultPrefix = defaultPrefix;
        this.database = database;
        this.administrators = administrators;
    }

    // handle messages
    handleCommand(message)
    {

        // parse the message
        if(!message.cleanContent.startsWith(this.defaultPrefix) || message.author.bot || message.author.system) return;
        let args = message.cleanContent.split(' ');


        // find the command
        let searchingFor = args[0].substring(this.defaultPrefix.length, args[0].length);
        for(let command of Command.m_commands)
            if(command.name.toLowerCase() == searchingFor.toLowerCase())
            {
                // is the command admin only?
                if(command.adminOnly)
                    if(!this.administrators.includes(message.author.id))
                        return message.channel.send(`${message.author} Unauthorized command \`${searchingFor}\``);
                // is a database connection necessary?
                if(command.requireDB)
                {
                    if(this.database)
                    {
                        if (!this.database.connected)
                        {
                            message.channel.send(`${message.author} \`${searchingFor}\` is currently unavailable due to a broken database connection. Now attempting to reconnect. Please try again soon.`);
                            return this.database.connect();
                        }
                    }
                    else
                        return message.channel.send(`${message.author} \`${searchingFor}\` is currently unavailable because there is no database configuration`);
                }
                return command.exec(message, this.database, this.client);
            }
        // could not find the requested command
        message.channel.send(`${message.author} Unrecognized command \`${searchingFor}\``);
    }
}

module.exports = {
    ClientHandler: ClientHandler
};
