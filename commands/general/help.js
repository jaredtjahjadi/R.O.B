module.exports = {
    name: "help",
    aliases: ['commands'],
    description: "Displays all commands.",
    execute(message, args) {
        if(!args.length) message.channel.send("Available commands: help, ping, play");
        else {
            message.channel.send("TBA");
        }
    }
};