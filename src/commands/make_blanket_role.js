const Command = require('../command.js'),
    new_command = new Command("label-role", (client, message, args) => {
        if(message.member.hasPermission(0x10000000))
        {
          let str = args.join(' ');
          // crappy regex alternative
          let name = str.substring(str.indexOf('"') + 1);
          let endofquote;
          let colorindex;
          // this confuses even me, but it should work theoretically speaking
          name = name.slice(0, (endofquote = name.indexOf('"')));
          for(let i = 0; i < args.length; i++)
          {
            if((endofquote -= args.length) <= 0)
            {
              colorindex = ++i;
              break;
            }
          }
          message.guild.createRole({
            name: name,
            color: Number(args[colorindex])
          }).then((role)=>{
            message.member.addRole(role);
            message.reply('Successfully created role!');
          }, (err)=>message.reply(`\`\`\`\n${err}\n\`\`\``);
          
        }
        else
        {
          message.reply('You cannot do that!');
        }
    });

module.exports = new_command;
