const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  // Translation
  let NoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
  let noMember = ['Du musst einen Member angeben.', 'You have to specify a member.']
  let canNot = ['Ich kann den User nicht Kicken.', "I can't kick this user."]
  if(!message.member.hasPermission("KICK_MEMBERS"))return message.channel.send(NoPerm[cur]);
  var toKick = await bot.fetchUser(message.mentions.users.first()) || await bot.fetchUser(args[0]);
  if(!toKick)return message.channel.send(noMember[cur]);
  let reason = argsO.slice(2).join(" ");
  if(!reason) reason = 'Undefined';
  if(!message.guild.member(toKick).kickable) return message.channel.send(canNot[cur]);
  message.guild.member(toKick).kick(`${toKick} got kicked from ${message.guild.name} from the Admin ${message.author.username} with the reason ${reason}`)
  .then(() => console.log(`Kicked ${toKick.username} on the ${message.guild.name}`))
  const channel = message.guild.channels.find(ch => ch.name === 'modlog');
  const kickEmbed = new RichEmbed()
  .setTitle('Kick')
  .addField('User:', `${toKick}`)
  .addField('Admin:', message.author)
  .addField('Reason', reason)
  channel.send(kickEmbed);
}

module.exports.help = {
  name: "KICK"
}
