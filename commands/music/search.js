const search = require('yt-search');
module.exports = {
    name: "search",
    aliases: [],
    description: "Search for a song to be played or added to the queue. Displays first 5 results.",
    args: false,
    usage: "",
    guildOnly: true,
    voiceOnly: true,
    execute(message, args) {        
        if(!serverQueue) return message.channel.send("There are no songs in the queue.");
        message.channel.send("Search command (WIP)");
    }
}