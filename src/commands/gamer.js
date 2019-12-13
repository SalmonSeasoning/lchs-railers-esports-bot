const Command = require('../command.js'),
    new_command = new Command("gamer", (client, message, args, db) => {
        //save metadata for gamer
        const database = require("../database.js");
        if(!database.doesCosmeticTableExist(db)) {
            message.reply('The cosmetic table does not exist. [gamer.js]');    
        } else {
            let gamerPercentage = Math.floor(Math.random() * 100) + 1;
            let userMetadata;
            database.getUserMetadata(db, user_id).then((res) => {
                userMetadata = Json.parse(res);
            }).catch((e) => {
                userMetadata = undefined;
            });
            if(userMetadata == undefined || userMetadata == '') {
                database.setUserMetadata(db, message.author.id, '{}').then((res) => {
                    //success... yay
                }, (err) => {
                    message.reply(`Failed to update your metadata.`);
                }).catch((e) => {
                    message.reply(`Error when updating your metadata. [${e}]`);
                });
                
                database.getUserMetadata(db, user_id).then((res) => {
                    userMetadata = Json.parse(res);
                }).catch((e) => {
                    userMetadata = undefined;
                });
            }
            //GOING TO WORK ON ANOTHER DAY
            if(userMetadata == undefined) {
                
            } else {
                message.reply(`You are ${userMetadata}`);   
            }
        }
    }, false, false);

module.exports = new_command;