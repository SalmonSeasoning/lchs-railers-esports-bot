class Command {
    constructor(name, func, isActiveCommand, requiresElevation) {
        if(Command.getCommandByName(name))
            throw(new Error(`A command named ${name} already exists!`));
        this.name = name;
        this.func = func;
        if(isActiveCommand == undefined || isActiveCommand) this.isActiveCommand = true;
        else if(!isActiveCommand) this.isActiveCommand = false;
        if(requiresElevation) this.requiresElevation = true;
        else
            this.requiresElevation = false;
        Command.commandList.push(this);
    }
    // Retrieve an array of command names
    static getCommandNames() {
        let _arr = [];
        Command.commandList.forEach((o)=>_arr.push(o.name));
        return _arr;
    }
    // Retrieve the command with a specific index
    static getCommandByIndex(index) {
        return Command.commandList[Math.floor(index)];
    }
    // Retrieve the command index by a name
    static getCommandIndexByName(name) {
        for (let command in Command.commandList) {
            if (Command.commandList[command].name.toLowerCase() == name.toLowerCase()) {
                return i;
            }
        }
    }
    // Retrieve a command (Object) by name
    static getCommandByName(name) {
        for (let command of Command.commandList) {
            if (command.name.toLowerCase() == name.toLowerCase()) {
                return command;
            }
        }
    }
    // Remove a command by index
    static removeCommandByIndex(index) {
        index = Math.floor(index);
        if (!index >= 0 || index >= Command.commandList.length) throw(new Error("Attempting to remove a non-existential command!"));
        for (let i = index; i < Command.commandList.length; i++)
            Command.commandList[i] = Command.commandList[i + 1];
        Command.commandList.pop();
    }
    // Remove a command by name
    static removeCommandByName(name) {
        Command.removeCommandById(Command.getCommandIndexByName(name));
    }
}

class CommandEx extends Command // var command = CommandEx({name:'test', func: ()=>{}, requiresElevation: false});
{
    constructor(SelectedOptions)
    {
      super(SelectedOptions['name'], SelectedOptions['func'], SelectedOptions['isActiveCommand'], SelectedOptions['requiresElevation']);
    }
}

Command.commandList = [];

module.exports = Command;
