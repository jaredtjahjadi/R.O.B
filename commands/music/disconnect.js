module.exports = {
    name: "disconnect",
    aliases: ["dc", "end", "leave"],
    description: "Disconnects from the voice channel.",
    args: false,
    usage: "",
    guildOnly: true,
    voiceOnly: true,
    execute(message, args) {        
        //Command doesn't work if bot not in a voice channel in the server it is used in (can't disconnect if there's nothing to disconnect from)
        if(!message.guild.voice) { return message.channel.send("I am not connected to a voice channel.") }

        //Bot leaves the channel, empties out queue (doesn't work yet), sends message
        message.member.voice.channel.leave();
        message.channel.send("Leaving the voice channel **" + message.member.voice.channel.name + "**.");
    }
}