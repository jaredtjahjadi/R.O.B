module.exports = {
    name: "roll",
    aliases: [],
    description: "Roll a dice! Virtually.",
    execute(message, args) {
        const num = Math.floor(Math.random() * 6 + 1);
        message.channel.send(`You rolled a ${num}!`);
    }
}