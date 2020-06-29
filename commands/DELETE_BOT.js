const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let start = ['Selbstzerstörung in', 'Self-destruction in']
  message.channel.send(start[cur])
  message.channel.send('3')
  message.channel.send('2')
  message.channel.send('1')
  message.channel.send('FAIL!!!')
}

module.exports.help = {
  name: "DELETE_BOT"
}
