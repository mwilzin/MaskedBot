const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  // Translation
  let noMessage = ["Bitte gebe eine nachrichten an die gesagt werden soll!", "Please give me a message to say!"]
  message.delete();
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    if (!args) return message.channel.send(noMessage[cur])
    let botmessage = argsO.join(" ");
    message.channel.send(`${botmessage}\n\n~${message.author.tag}`)
  } else {
    if (!args) return message.channel.send(noMessage[cur])
    let botmessage = argsO.join(" ");
    message.channel.send(botmessage)
  }
}

module.exports.help = {
  name: "SAY"
}
