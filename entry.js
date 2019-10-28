const Discord = require('discord.js'),
    client = new Discord.Client();

client.on('ready', ()=>{
    console.log('The bot is online!');
});

client.on('reconnecting', ()=>{
    console.log('Disconnected! Attempting to reconnect!');
});

client.on('disconnect', ()=>{
    console.error('Failed to connect to Discord servers... Exiting.');
    process.exit(-1);
});

client.on('message', (message)=>{
    // Where all the magic happens!
});

client.login(process.env.TOKEN);