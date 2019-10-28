class Command
{
    constructor(name, func)
    {
        this.name = name;
        this.func = func;
        Command.commandList.push(this);
    }
    
}

Command.commandList = [];

module.exports = Command;