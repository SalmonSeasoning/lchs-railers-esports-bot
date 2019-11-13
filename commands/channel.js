const Command = require('../command.js'),
    new_command = new Command("channel", (client, message, args) => {
        if(!message.member.hasPermission(0x10))
            return message.reply('You do not have permission to use this command!');
        switch(ToLowerCase(args[0]))
        {
            case "create":
                if(ToLowerCase(args[1]) == 'text')
                {
                    var _args = args;
                    _args.shift();
                    var channelName = args.join('-');
                    message.guild.createChannel(channelName, {type:'text'}).then(()=>{
                        message.reply(`**Successfully created #${channelName}**`);
                    }, ()=>{
                        message.reply('Failed to create text channel!');
                    });
                    
                }
                else if(ToLowerCase(args[1]) == 'voice')
                {
                    var _args = args;
                    _args.shift();
                    var channelName = args.join(' ');
                    message.guild.createChannel(channelName, {type:'voice'}).then(()=>{
                        message.reply(`**Successfully created voice channel : ${channelName}**`);
                    }, ()=>{
                        message.reply('Failed to create voice channel!');
                    });
                }
                else if(args[1])
                {
                    message.reply('Please correctly specify the channel type! Can either be `voice` or `text`');
                }
                else
                {
                    message.reply('Please specify a channel type!');
                }
                break;
            case "delete":
                    // Tyler can do this
                break;
            default:
                message.reply('Failed to perform action. Neither "create" nor "delete" specified.');
        }
    });

function ToLowerCase(x)
{
    return x.toLowerCase();
}

module.exports = new_command;
