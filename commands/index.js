const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs').promises;
const path = require('path');
const { prefix, token } = require('../config.json');
client.login(token);
client.commands = new Map();
client.on('ready', () => {
    console.log("Bot online.");
});

client.on('message', async function(message) {
    if(message.author.bot || !message.content.startsWith(prefix)) return;
    let cmdArgs = message.content.substring(message.content.indexOf(prefix) + 1).split(new RegExp(/\s+/));
    let cmdName = cmdArgs.shift();

    if(client.commands.get(cmdName)) client.commands.get(cmdName).execute(message, cmdArgs);
});

(async function registerCommands(dir = '../commands') {
    let files = await fs.readdir(path.join(__dirname, dir));
    console.log(files);/*
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) { registerCommands(path.join(dir, file)); }
        else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
                console.log(client.commands);
            }
        }
    }*/
})

/*const Discord = require("discord.js"); //Require discord.js
const { prefix, token } = require("./config.json"); //Require separate config file
const client = new Discord.Client(); //discord.js client (bot)
const fs = require('fs').promises; //Requires file-searching module
const path = require('path'); //Resolves paths
client.commands = new Map();

//Events when client is ready to go online
client.once('ready', () => {
    console.log(`${client.user.tag} online.`);
    console.log(__dirname);

    //Displays "Playing <parameter>" under client status
    client.user.setActivity("Super Smash Bros. Ultimate");
});

//Client logs in
client.login(token);

client.on("message", message => {
    //Returns if message author is a bot or if message doesn't start w/ prefix
    if(message.author.bot || !message.content.startsWith(prefix)) return;

    let cmdArgs = message.content.substring(message.content.indexOf(prefix) + 1).split(new RegExp(/\s+/));
    let cmdName = cmdArgs.shift();

    if(client.commands.get(cmdName)) {
        client.commands.get(cmdName).execute(message, args);
    }
    else {
        message.channel.send("??? Command does not exist.");
    }
});

//Command handler
(async function registerCommands(dir = '/commands') {
    console.log(dir);
    let files = await fs.readdir(path.join(__dirname, dir));
    console.log(files);
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        console.log(stat);

        //Recursively rabs commands from subfolders
        if(stat.isDirectory()) registerCommands(path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
                console.log(client.commands);
            }
        }
    }
});
*/