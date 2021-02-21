//Requirements for the bot to run correctly
const Discord = require("discord.js"); //Require discord.js (basis of all Discord bots)
const { prefix, token } = require("./config.json"); //Require separate config file (esp. to hide token)
const fs = require('fs'); //Required for the command handler to work
const client = new Discord.Client(); //discord.js client (bot)

//Events when client is ready to go online
client.once('ready', () => {
    console.log(`${client.user.tag} online.`);

    //Displays "Playing <parameter>" under client status
    client.user.setActivity("Super Smash Bros. Ultimate | ?help");
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

    //The gatekeepers of command execution. Returns and sends a message if:
    //User sends nonexistent command
    if(!cmd) return message.channel.send("Command does not exist.");
    //User uses a server-only command in DMs
    if(cmd.guildOnly && message.channel.type == "dm") return message.channel.send("This command cannot be used in direct messages.");
    //User sends no args for command that requires args
    if(cmd.args && !cmdArgs.length) return message.channel.send("This command requires args! Type \"?help <command>\" for proper usage.");

    //Command execution
    try { cmd.execute(message, cmdArgs); } //Executes the command
    catch(error) { //In case something goes wrong
        console.log(error); //Logs error to console
        message.channel.send("Error in executing command."); //Sends message to chat
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