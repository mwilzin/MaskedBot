const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let hey = ['Moin', 'Hey']
  message.channel.send(`${hey} ${message.author.username}`)
}

module.exports.help = {
  name: "MOIN"
}
