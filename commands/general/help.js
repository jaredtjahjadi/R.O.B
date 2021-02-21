const { prefix } = require('../../config.json');
module.exports = {
    name: "help",
    aliases: ['commands'],
    description: "Displays all commands.",
    args: false,
    usage: "[command]",
    guildOnly: false,
    execute(message, args) {
        const { commands } = message.client;

        //If no args are specified
        if(!args.length) {
            message.channel.send("All commands: " + commands.map(command => command.name).join(", "), { split: true });
        }
        //If args (a command) is specified, send a message specifically describing the command
        else {
            const name = args[0].toLowerCase(); //Stores the first argument in a variable
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if(!command) return message.channel.send("Invalid command."); //Sends message if the command doesn't exist

            //Builds and sends the message
            const msgName = `**Name:** ${command.name}\n`;
            //Aliases section of the message
            let msgAliases = `**Alias(es):** `;
            (command.aliases.length != 0) ? msgAliases += `${command.aliases.join(', ')}\n` : msgAliases += "None\n";
            const msgDesc = `**Description:** ${command.description}\n`;
            let msgUse = `**Usage:** ${prefix}${command.name} `;
            if(command.usage) msgUse += `${command.usage}`;
            message.channel.send(msgName + msgAliases + msgDesc + msgUse, { split: true});
        }
    }
};