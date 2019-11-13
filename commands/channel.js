const Command = require('../command.js'),
    new_command = new Command("channel", (client, message, args) => {
        if(!message.member.hasPermission(0x10))
            return message.reply('You do not have permission to use this command!');
        
        switch(ToLowerCase(args[0])) {
            //CREATE FUNCTION
            case "create":
                if(ToLowerCase(args[1]) == 'text') {
                    var _args = args;
                    _args.shift();
                    var channelName = args.join('-');
                    message.guild.createChannel(channelName, {type:'text'}).then(()=>{
                        message.reply(`**Successfully created #${channelName}**`);
                    }, ()=>{
                        message.reply('Failed to create text channel!');
                    });
                    
                }
                else if(ToLowerCase(args[1]) == 'voice') {
                    var _args = args;
                    _args.shift();
                    var channelName = args.join(' ');
                    message.guild.createChannel(channelName, {type:'voice'}).then(()=>{
                        message.reply(`**Successfully created voice channel : ${channelName}**`);
                    }, ()=>{
                        message.reply('Failed to create voice channel!');
                    });
                }
                else if(args[1]) {
                    message.reply('Please correctly specify the channel type! Can either be `voice` or `text`');
                }
                else {
                    message.reply('Please specify a channel type!');
                }
                break;
            //DELETE FUNCTION
            case "delete":
                let mentionedChannels = message.mentions.channels.array();
                let channelAmount = mentionedChannels.length;
                
                //if mentioned channels is bigger than zero
                if(channelAmount > 0) {
                    let deletedAmount = 0;
                    //loop through channels and delete
                    for(let i = 0; i < channelAmount; i++) {
                        let channel = mentionedChannels[i];
                        
                        channel.delete().then(() => {
                            deletedAmount++;
                        }).catch(() => {
                            //handle if you would like
                        });
                    }
                    //if you want to add a message embed and specify which channels couldnt be deleted go ahead
                    
                    //if successfully deleted more than o
                    if(deletedAmount > 0) {
                        message.reply(`Successfully deleted ${deletedAmount}` + (deletedAmount == channelAmount ? `` : `. Failed to delete ${channelAmount - deletedAmount} channels.`));
                    } else { //failed to delete any channels
                        message.reply('Failed to delete the specified ' + (channelAmount > 1 ? 'channels' : 'channel') + '.');
                    }
                } else {
                    message.reply('Please mention some channels like so: <#614129178891124742>');
                }
                break;
            default:
                message.reply('Failed to perform action. Neither "create" nor "delete" specified.');
                break;
        }
    });

function ToLowerCase(x) {
    return x.toLowerCase();
}

module.exports = new_command;
