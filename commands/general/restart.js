//Requirements for this command to run properly
const client = require('../../index'); //Get the same client from index.js
const { token } = require('../../config.json'); //Get the same bot token from config.json

module.exports = {
    name: "restart",
    aliases: ["refresh"],
    description: "Restarts the bot and gets the latest changes to its code. Only usable by bot creator.",
    execute(message, args) {
        if(message.author.id === "284550014963810304")
            message.channel.send("Restarting the bot...")
            .then(msg => client.destroy())
            .then(() => client.login(token))
            .then(client.user.setActivity("Super Smash Bros. Ultimate"))
            .then(message.channel.send("Bot restarted!"));
    }
}