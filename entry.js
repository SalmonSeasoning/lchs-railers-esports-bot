const Discord = require('discord.js'),
    client = new Discord.Client(),
    Command = require('./command.js');

client.on('ready', ()=>{
    console.log('The bot is online!');
});

client.on('reconnecting', ()=>{
    console.log('Disconnected! Attempting to reconnect!');
});

client.on('disconnect', ()=>{
    throw(new Error('Failed to connect to Discord servers...'));
});

client.on('message', (message)=>{
    // Where all the magic happens!
    
});

client.login(process.env.TOKEN);