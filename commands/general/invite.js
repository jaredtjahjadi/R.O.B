module.exports = {
    name: "invite",
    aliases: [],
    description: "Displays all commands.",
    args: false,
    usage: "",
    guildOnly: false,
    execute(message, args) {
        message.channel.send("Invite Bot: https://bit.ly/37xMIEB\nBot Server: TBA");
    }
};