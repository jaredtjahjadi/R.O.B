const playModule = require('./play');
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
        if(!message.guild.voice) return message.channel.send("I am not connected to a voice channel.")
        playModule.serverQueue.songs = []; //Empties out queue
        playModule.serverQueue.connection.dispatcher.end(); //Leaves channel
        message.channel.send(`Leaving the voice channel **${message.member.voice.channel.name}**.`); //Sends message
    }
}