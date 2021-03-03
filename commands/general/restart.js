//Requirements for this command to run properly
const client = require('../../index'); //Get the same client from index.js
const { token, ownerID } = require('../../config.json'); //Get the same bot token from config.json

module.exports = {
    name: "restart",
    aliases: ["refresh"],
    description: "Restarts the bot and gets the latest changes to its code. Only usable by bot creator.",
    args: false,
    usage: "",
    guildOnly: false,
    voiceOnly: false,
    execute(message, args) {
        if(message.author.id === ownerID) {
            botRestart(message.channel);
        }
        else message.channel.send("You are not the creator of the bot!");
    }
}

function botRestart(c) {
    c.send("Restarting the bot...")
    .then(msg => client.destroy())
    .then(() => client.login(token));
}