const FS = require("fs");

const g_Config = {
    "global_prefix": "!",
    "activity": "<BOT ACTIVITY GOES HERE>",
    "presence": "online",
    "database": {
        "host": "<DATABASE IP ADDRESS>",
        "username": "<DATABASE USERNAME>",
        "password": "<DATABASE PASSWORD>",
        "database": "<SELECTED DATABASE NAME>"
    },
    "administrator_uids": [
        "<YOUR ACCOUNT USER ID GOES HERE>"
    ],
        "private_token": "<BOT TOKEN GOES HERE>"
}
FS.writeFile("./config.json", JSON.stringify(g_Config), (err) => {
    if (err) throw err;
    console.log('Config.json generated successfully!');
}); 
