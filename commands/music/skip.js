const play = require('./play');
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
        if(!playModule.serverQueue) return message.channel.send("You can't skip songs that don't exist!");
        playModule.serverQueue.connection.dispatcher.end();
    }
}