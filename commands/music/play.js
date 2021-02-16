const ytdl = require('ytdl-core');
module.exports = {
    name: "play",
    description: "Displays all commands.",
    execute(message, args) {
        if(!args.length) {
            return message.channel.send("You didn't provide keywords nor a URL.");
        }
        if(message.member.voice.channel) {
            message.member.voice.channel.join().then(connection => {
                const stream = ytdl(`${args}`, { filter: 'audioonly' });
                const dispatcher = connection.play(stream);
                dispatcher.on('finish', () => voiceChannel.leave());
            })
        }
        else message.channel.send("You're not in a voice channel!");
    }
};