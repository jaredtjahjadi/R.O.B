const playModule = require('./play');

module.exports = {
    name: "skip",
    aliases: [],
    description: "Skips the song currently being played by the bot in a voice channel.",
    args: false,
    usage: "",
    guildOnly: true,
    voiceOnly: true,
    execute(message, args) {
        if(!message.guild.voice) return message.channel.send("I am not connected to a voice channel."); //Bot not in VC
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return message.channel.send("No queue.");
        serverQueue.connection.dispatcher.end("Song skipped.");
    }
}