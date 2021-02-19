//Requirements for the bot to run correctly
const Discord = require("discord.js"); //Require discord.js (basis of all Discord bots)
const { prefix, token } = require("./config.json"); //Require separate config file (esp. to hide token)
const fs = require('fs'); //Required for the command handler to work
const client = new Discord.Client(); //discord.js client (bot)

//Events when client is ready to go online
client.once('ready', () => {
    console.log(`${client.user.tag} online.`);

    //Displays "Playing <parameter>" under client status
    client.user.setActivity("Super Smash Bros. Ultimate");
});

//Client logs in
client.login(token);

//Client listens to messages sent in chat
client.on("message", message => {
    //Triggers a message when bot is mentioned (redirect to using proper prefix instead)
    if(message.mentions.has(client.user)) return message.channel.send("Use the prefix \"?command\" instead! (e.g. ?help)");

    //Returns if message author is a bot or if message doesn't start w/ prefix
    if(message.author.bot || !message.content.startsWith(prefix)) return;

    //Determines what is a command and what is an argument (splits up name and args based on spaces)
    const cmdArgs = message.content.substring(message.content.indexOf(prefix) + prefix.length).split(new RegExp(/\s+/));
    const cmdName = cmdArgs.shift().toLowerCase();

    //Sets up commands and command aliases
    const cmd = client.commands.get(cmdName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(cmdName));

    //Sends a message if the user sends a nonexistent command
    if(!cmd) message.channel.send("Command does not exist.");

    //Attempts to execute command, logs to console + sends error message if something goes wrong
    try { cmd.execute(message, cmdArgs); }
    catch(error) {
        console.log(error);
        message.channel.send("Error in executing command.");
    }
});

//Command handler: Allows for separate command files
client.commands = new Discord.Collection(); //Initializes new, empty collection of client commands
loadCommands(client.commands, './commands'); //Makes commands ready to be used
//A function to search through subfolders of the given folder
function loadCommands(collection, directory) {
    const files = fs.readdirSync(directory); //Reads the given directory

    //Iterate through every file (including folders) in the given directory
    for (const file of files) { 
        const path = `${directory}/${file}`; //Gets the exact file path
        
        //If the file is a .js file, add to command collection
        if(file.endsWith('.js')){
            const command = require(path);
            collection.set(command.name, command); 
        }
        //If the file is a directory, use recursion
        else if(fs.lstatSync(path).isDirectory()) loadCommands(collection, path);
    }
};