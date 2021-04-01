const { prefix } = require('../../config.json');
module.exports = {
    name: "rps",
    aliases: [],
    description: "Play a game of rock paper scissors! Either with the bot or with another player.",
    args: true,
    usage: "(rock|paper|scissors|@(username))",
    guildOnly: false,
    voiceOnly: false,
    execute(message, args) {
        //Playing with the bot
        const viableArgs = ["rock", "paper", "scissors"]; //Which args are viable when playing w/ bot
        const botChoice = viableArgs[Math.floor(Math.random() * 3)];
        const editedMsg = `I chose ${botChoice}!`;
        if(viableArgs.includes(args[0])) {
            message.channel.send("Rock, paper, scissors, and...shoot!").then(msg => {
                setTimeout(
                    function determineWinner() {
                        //Draw: User and bot chose the same option
                        if(args[0] == botChoice) msg.edit(`${editedMsg} It's a draw!`);
                        //User wins
                        else if((args[0] == "rock" && botChoice == "scissors") || (args[0] == "paper" && botChoice == "rock") || (args[0] == "scissors" && botChoice == "paper"))
                            msg.edit(`${editedMsg} You won!`);
                        else //User loses
                            msg.edit(`${editedMsg} You lost...`);
                    }, 2000);
            });
        }

        //Playing with another user
        else {
            const mention = message.mentions.members.first();
            if(mention) {
                if(mention == message.member) message.channel.send("You can't play rock, paper, scissors with yourself!");
                else if(mention.user.bot) message.channel.send("You can't play rock, paper, scissors with a bot!");
                else {
                    const mentionedUser = mention.user;
                    message.channel.send(`${mentionedUser}, ${message.member.user} would like to play rock paper scissors with you! Do you accept?`).then(sent => {
                        sent.react("✔️");
                        sent.react("❌");
                    });
                }
            }
            else message.channel.send(`Invalid args. Type "${prefix}help <command>" for proper usage.`);
        }
    }
}