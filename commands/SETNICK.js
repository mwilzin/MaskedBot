const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let more32 = ['Dein Nickname darf nicht mehr als 32 Zeichen enthalten.', 'Your nickname can not contain more than 32 characters.']
  if (argsO.join(" ").length > 32)return message.channel.send(more32[cur]);
    message.member.setNickname(argsO.join(" "));
}

module.exports.help = {
  name: "SETNICK"
}
