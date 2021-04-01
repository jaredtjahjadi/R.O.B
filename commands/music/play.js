const ytdl = require('ytdl-core'); //Required for YouTube videos to be played
const search = require('yt-search'); //Required to play first video w/ keywords
const queue = new Map(); //Global queue: Each server has a key and value

module.exports = {
    name: "play",
    aliases: ["p"],
    description: "Play music in a voice channel.",
    args: true,
    usage: "<YouTube URL/keywords>",
    guildOnly: true,
    voiceOnly: true,
    async execute(message, args) {
        const vc = message.member.voice.channel; //Stores the voice channel the user is currently in
        const serverQueue = queue.get(message.guild.id); //Server queue

        //Determines what YouTube video the user is requesting
        let song = {};
        //Request by YouTube URL (below code only happens if URL is valid)
        if(ytdl.validateURL(args[0])) {
            const songInfo = await ytdl.getInfo(args[0]);
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.url, duration: songInfo.videoDetails.lengthSeconds }
        }
        //Request by searching with keywords
        else {
            //Returns the first result in 
            const videoFinder = async (query) => {
                const videoResult = await search(query);
                return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
            }
            const video = await videoFinder(args.join(' '));
            if(video) song = { title: video.title, url: video.url, duration: video.lengthSeconds };
            else return message.channel.send("Couldn't find video. Try different keywords!");
        }

        //Checks song duration, doesn't queue if longer than 60 minutes
        if(song.duration > 3600) return message.channel.send("Cannot play a song longer than 60 minutes.");

        //If the queue is empty
        if(!serverQueue) {
            const queueConstr = {
                voiceChannel: vc,
                textChannel: message.channel,
                connection: null, //No connection to a vc yet
                songs: [] //Empty queue
            }
            queue.set(message.guild.id, queueConstr);
            queueConstr.songs.push(song);

            try {
                const connection = await vc.join();
                queueConstr.connection = connection;
                message.channel.send(`Connected to the voice channel **${vc.name}**.`);
                player(message.guild, queueConstr.songs[0]);
            }
            catch(err) {
                queue.delete(message.guild.id);
                message.channel.send("Connection error."); //Send a message
                console.log(err); //Send an error message to console
            }
        }
        else { //If there is at least one song in the queue
            serverQueue.songs.push(song); //Add to queue
            return message.channel.send(`Added **${song.title}** to queue.`); //Send message
        }
        module.exports.serverQueue = queue.get(message.guild.id); //Server queue
    }
}

//Function that allows for songs to be played
const player = async (guild, song) => {
    const songQueue = queue.get(guild.id);
    if(!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly' });
    songQueue.connection.play(stream, { seek: 0, volume: 0.5 }).on('finish', () => {
        songQueue.songs.shift(); //Move all songs in the queue one spot up
        player(guild, songQueue.songs[0]); //Recursively play the next song
    });

    //Sends message when next song starts playing
    await songQueue.textChannel.send(`Now playing **${song.title}**.`);
}