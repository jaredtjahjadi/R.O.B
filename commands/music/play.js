const ytdl = require('ytdl-core'); //Required for YouTube videos to be played

module.exports = {
    name: "play",
    aliases: [],
    description: "Play music in a voice channel!",
    args: true,
    usage: "<YouTube URL/keywords>",
    guildOnly: true,
    //Check if user in VC -> check args
    execute(message, args) {
        //Returns and sends message if user is not in voice channel
        if(!message.member.voice.channel) return message.channel.send("You're not in a voice channel!");

        //The bot joins the voice channel
        message.channel.send("Joining the voice channel **" + message.member.voice.channel.name + "**."); //Sends message
        message.member.voice.channel.join().then(connection => { //Connects to voice channel
            //Sets up and plays the stream
            const stream = ytdl(`${args}`, { filter: 'audioonly' });
            message.channel.send("Now playing a song.");
            const dispatcher = connection.play(stream);

            //Once the music finishes, the bot leaves the voice channel
            dispatcher.on('finish', () => {
                message.member.voice.channel.leave();
                message.channel.send("Playback ended. Leaving the voice channel **" + message.member.voice.channel.name + "**.");
            });
        })
    }
};