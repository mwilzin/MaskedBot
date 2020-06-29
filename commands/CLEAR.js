const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let NoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
  let noMessages = ['Du hast keine Anzahl an Nachrichten zum löschen angegeben.', 'You have not specified a number of messages to delete.']
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(NoPerm[cur]);
  if (!args[0]) return message.channel.send(noMessages[cur]);
  message.channel.bulkDelete(args[0]).then(() => {
    let cleared = [`${args[0]} Nachrichten wurden gelöscht`, `Cleared ${args[0]} messages`]
    message.channel.send(cleared[cur]).then(msg => msg.delete(5000));
  })
}

module.exports.help = {
  name: "CLEAR"
}
