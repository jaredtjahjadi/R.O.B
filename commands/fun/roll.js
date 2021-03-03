module.exports = {
    name: "roll",
    aliases: [],
    description: "Roll a dice! Virtually.",
    args: false,
    usage: "",
    guildOnly: false,
    voiceOnly: false,
    execute(message, args) {
        const num = Math.floor(Math.random() * 6 + 1);
        //Send an initial message
        message.channel.send("Rolling the dice...").then(msg => {
            setTimeout(
                //Edit the msg after 2 seconds, indicating what the user rolled
                function headsOrTails() { msg.edit(`You rolled a ${num}!`) }, 2000);
        });
    }
}