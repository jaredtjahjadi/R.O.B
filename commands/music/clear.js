module.exports = {
    name: "clear",
    aliases: ["c"],
    description: "Clears the current queue.",
    args: true,
    usage: "",
    guildOnly: true,
    voiceOnly: true,
    async execute(message, args) {
        message.channel.send("Queue command (WIP)");
    }
}