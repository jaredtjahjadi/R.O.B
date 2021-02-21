module.exports = {
    name: "stop",
    aliases: ["disconnect", "end", "leave"],
    description: "The bot leaves the voice channel.",
    args: false,
    usage: "",
    guildOnly: true,
    execute(message, args) {
        if(!message.member.voice.channel) { return message.channel.send("You're not in a voice channel!"); }
        message.member.voice.channel.leave();
        message.channel.send("Leaving the voice channel **" + message.member.voice.channel.name + "**.");
    }
}