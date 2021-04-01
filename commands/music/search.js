const search = require('yt-search');
const playModule = require('./play');
module.exports = {
    name: "search",
    aliases: [],
    description: "Search for a song to be played or added to the queue. Displays first 5 results.",
    args: false,
    usage: "",
    guildOnly: true,
    voiceOnly: true,
    execute(message, args) {
        message.channel.send("Search command (WIP)");
    }
}