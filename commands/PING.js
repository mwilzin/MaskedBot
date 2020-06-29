const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  message.channel.send(`Pong\r\n${bot.ping}`).then(m => {
    let ping = m.createdTimestamp - message.createdTimestamp;
    m.edit(`Pong!!! (${ping}ms)`)
  })
}

module.exports.help = {
  name: "PING"
}
