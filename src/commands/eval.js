const { Command } = require("../classes/command");

new Command("eval", {
    callee: (message, database) => { // be careful when referencing database! must do a .connected check!
        const text = message.cleanContent.split(' ').splice(1).join(' ');
        message.channel.send(`Executing the following JavaScript code: \`\`\`js\n${text}\`\`\``).then(()=>{
            try {
                eval(text);
            } catch (except) {
                message.channel.send(`Failed to execute: ${except}`);
            }
        });
    },
    description: "Evaluates inline JavaScript",
    adminOnly: true
});
