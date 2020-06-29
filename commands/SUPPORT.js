const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation
  let vSupQuestion = ["Support Anfrage", "Support Question"]
  let vBy = ["Von", "By"]
  let vQuestion = ["Anfrage", "Question"]
  let vChannel = ["Kanal", "Channel"]

  const channel = message.guild.channels.find(ch => ch.name === 'modlog');
  const SupportAnfrage = new RichEmbed()
  .setTitle(vSupQuestion[cur])
  .addField(vBy[cur], `<@${message.author.id}>`)
  .addField(vQuestion[cur], `${argsO.join(" ")}`)
  .addField(vChannel[cur], `<#${message.channel.id}>`)
  channel.send(SupportAnfrage)
}

module.exports.help = {
  name: "SUPPORT"
}
