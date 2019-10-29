const Command = require('../command.js'),
    new_command = new Command("ban", (client, message, args) => {
        var mentionedPeople = message.mentions;
        var bannedPeople = 0;
        var bannedPeopleString = "";
        for(let i = 0; i < mentionedPeople.length; i++) {
            let member = mentionedPeople.members.array()[i];
            if(member.bannable) {
                bannedPeople++;
                member.ban();  
                bannedPeopleString += `<@${member.id}>` + (i == mentionedPeople.length ? '' : '\n');
            }
        }
        const output = new Discord.RichEmbed()
            .setTitle("Railer Punishment System - RPS")
            .setColor(0xf0380e)
            .setDescription(`**${bannedPeople}** were successfully banned.`)
            .setFooter("LCHS eSports Bot", "../resources/icon.png")
            .setThumbnail("../resources/icon.png")
            .setTimestamp()
            .addField("Banned Users", bannedPeopleString, false);
        message.author.send({output});
    });

module.exports = new_command;
