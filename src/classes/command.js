const {ternaryIf} = require("../utils");

// default function
function virtualFunction(message, database){ console.log(`Undefined command call with parameters: ${message}, ${database}`); }

class Command {
    constructor(name, /*func, desc, adminOnly, requireDB*/ options)
    {
        this.name = name.toLowerCase().split(' ')[0]; // for parsing reasons
        this.func = ternaryIf(options["callee"], virtualFunction);
        this.desc = options["description"];
        this.adminOnly = options["adminOnly"] ? true : false;
        this.requireDB = options["requireDB"] ? true : false;
        Command.m_commands.push(this);
    }
    exec(message, database, client) // call the function
    {
        this.func(message, database, client);
    }
}

Command.m_commands = []; // static array of all the Command objects created

module.exports = {
    Command: Command
};
