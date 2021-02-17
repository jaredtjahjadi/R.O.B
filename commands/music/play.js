const ytdl = require('ytdl-core'); //Required for YouTube videos to be played

module.exports = {
    name: "play",
    description: "Play music in a voice channel!",
    //Check if user in VC -> check args
    execute(message, args) {
        //Sends message if user is not in voice channel
        if(!message.member.voice.channel) return message.channel.send("You're not in a voice channel!");

        //Sends message if no args are provided
        if(!args.length) return message.channel.send("You didn't provide keywords nor a URL.");

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