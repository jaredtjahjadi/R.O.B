module.exports = {
    name: "queue",
    aliases: [],
    description: "Displays the songs currently on queue to be played in the voice channel.",
    args: false,
    usage: "",
    guildOnly: true,
    execute(message, args) {
        message.channel.send("Queue command (WIP)");
    }
}