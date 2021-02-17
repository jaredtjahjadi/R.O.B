module.exports = {
    name: "ping",
    aliases: [],
    description: "Check if the bot is online.",
    execute(message, args) {
        message.channel.send("Loading...").then(sent => {
            sent.edit(`Pong! (${sent.createdTimestamp - message.createdTimestamp}ms)`)
        });
    }
}