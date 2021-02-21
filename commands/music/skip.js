module.exports = {
    name: "skip",
    aliases: [],
    description: "Skips the song currently being played by the bot in a voice channel.",
    args: false,
    usage: "",
    guildOnly: true,
    execute(message, args) {
        //Sends message if user is not in voice channel
        if(!message.member.voice.channel) return message.channel.send("You're not in a voice channel!");
        
        message.channel.send("Skip command (WIP)");
    }
}