const musicModule = require('./play');
module.exports = {
    name: "pause",
    aliases: ["stop"],
    description: "Pauses music playback.",
    args: false,
    usage: "",
    guildOnly: true,
    voiceOnly: true,
    execute(message, args) {        
        //Command doesn't work if bot not in a voice channel in the server it is used in (can't disconnect if there's nothing to disconnect from)
        if(!message.guild.voice) { return message.channel.send("I am not connected to a voice channel.") }
        musicModule.serverQueue.connection.play(musicModule.player.stream).pause();
        message.channel.send("Current song paused.");
    }
}