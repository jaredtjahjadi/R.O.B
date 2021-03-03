module.exports = {
    name: "coinflip",
    aliases: ["flip"],
    description: "Flips a (virtual) coin.",
    args: false,
    usage: "",
    guildOnly: false,
    voiceOnly: false,
    execute(message, args) {
        const r = Math.floor(Math.random() * 2 + 1);
        message.channel.send("Flipping coin...").then(msg => {
            setTimeout(
                function headsOrTails() {
                    if(r == 1) msg.edit("Heads!");
                    else msg.edit("Tails!");
                }, 2000);
        });
    }
}