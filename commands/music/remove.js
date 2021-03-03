module.exports = {
    name: "remove",
    aliases: ["rm", "delete", "del"],
    description: "Removes a song from the queue.",
    args: false,
    usage: "",
    guildOnly: true,
    voiceOnly: true,
    execute(message, args) {
        //Returns and sends message if user is not in voice channel
        if(!message.member.voice.channel) return message.channel.send("You're not in a voice channel!");

        message.channel.send("Remove command (WIP)");
    }
}