const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js')

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation
  let vNoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
  let vUndefined = ["Unbestimmt", "Undefined"]
  let vUnbanEmbed = ["Entbannung", "Unban"]
  let vUser = ["Benutzer", "User"]
  let vReason = ["Grund", "Reason"]

  if(!message.member.hasPermission("BAN_MEMBERS"))return message.channel.send(vNoPerm[cur]);
  var toUnban = await bot.fetchUser(args[0]);
  let reason = argsO.slice(1).join(" ");
  if(!reason) reason = vUndefined[cur];
  let vUnbanMessage = [`${toUnban} wurde von ${message.guild.name} vom Admin ${message.author.username} aus folgenden Grund "${reason}" entbannt.`, `${toUnban} got Unbanned from ${message.guild.name} from the Admin ${message.author.username} with the reason "${reason}".`]
  message.guild.unban(toUnban, vUnbanMessage[cur])
  .then(() => console.log(`Unbanned ${toUnban.username} on the ${message.guild.name}`))
  const channel = message.guild.channels.find(ch => ch.name === 'modlog');
  const unbanEmbed = new RichEmbed()
  .setTitle(vUnbanEmbed[cur])
  .addField(vUser[cur], `${toUnban}`)
  .addField('Admin', message.author)
  .addField(vReason[cur], reason)
  channel.send(unbanEmbed);
}

module.exports.help = {
  name: "UNBAN"
}
