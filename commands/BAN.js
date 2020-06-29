const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js')

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation
  let vNoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
  let vNoToBann = ["Du kannst diesen Benutzer nicht bannen.", "You can't ban that user."]
  let vBan = ["Bann", "Ban"]
  let vUser = ["Benutzer:", "User:"]
  let vReason = ["Grund:", "Reason:"]


  if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(vNoPerm[cur]);
  var toBan = await bot.fetchUser(message.mentions.users.first()) || await bot.fetchUser(args[0]);
  let reason = argsO.slice(2).join(" ");
  if (!reason) reason = 'Undefined';
  if (!message.guild.member(toBan).bannable) return message.channel.send(vNoToBann[cur]);
  let vBannedMessage = [`${toBan} wurde vom Server ${message.guild.name} vom Administrator ${message.author.username} aus folgendem Grund ${reason} gebannt` ,`${toBan} got Banned from ${message.guild.name} from the Admin ${message.author.username} with reason ${reason}`]
  message.guild.ban(toBan, vBannedMessage[cur])
    .then(() => console.log(`Banned ${toBan.username} on the ${message.guild.name}`))
  const channel = message.guild.channels.find(ch => ch.name === 'modlog');
  const banEmbed = new RichEmbed()
    .setTitle(vBan[cur])
    .addField(vUser[cur], `${toBan}`)
    .addField('Admin:', message.author)
    .addField(vReason[cur], reason)
  channel.send(banEmbed);
}

module.exports.help = {
  name: "BAN"
}
