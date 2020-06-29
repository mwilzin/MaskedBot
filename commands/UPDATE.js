const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  if(!message.author.id != '459737180244410378') return;
  const updateEmbed = new RichEmbed()
  .setTitle('UPDATE')
  .addField('News', argsO.slice(0).join(" "))
  .setFooter('triggeredLife#1182')
  bot.guilds.forEach(guild => {
    guild.owner.send(updateEmbed);
  });
}

module.exports.help = {
  name: "UPDATE"
}
