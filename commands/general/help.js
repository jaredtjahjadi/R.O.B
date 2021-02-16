module.exports = {
    name: "help",
    aliases: ['commands'],
    description: "Displays all commands.",
    args: false,
    execute(message, args) {
        message.channel.send("Help command! (TBA)");
    }
};