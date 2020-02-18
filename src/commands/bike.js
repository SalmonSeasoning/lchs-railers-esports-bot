const { Command } = require("../classes/command");

new Command("bike", {
    callee: (message, database)=>{
					message.reply("should've pocketed the bike! :bike:");
    }
});
