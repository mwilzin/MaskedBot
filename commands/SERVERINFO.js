const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let owner = ['Besitzer', 'Owner']
  let created = ['Erstellt', 'Created']
  var invite = await message.channel.createInvite(unique = true);
  con.query(`SELECT infos FROM serverSettings WHERE id = ${message.guild.id}`, (err, answ) => {
    if (answ[0].money === 0)return;
    var craetedAt = message.guild.createdAt;
    var day = craetedAt.getDate();
    var month = craetedAt.getMonth() + 1;
    var year = craetedAt.getFullYear();
    let createdAtMessage = [`am ${day}.${month}.${year}`, `at ${day}.${month}.${year}`]
    const serverinfoEmbed = new RichEmbed()
      .setTitle('Serverinfo')
      .addField('Name', message.guild.name, inline = true)
      .addField(owner[cur], message.guild.owner, inline = true)
      .addField('Users', message.guild.memberCount, inline = true)
      .addField(created[cur], createdAtMessage[cur], inline = true)
      .addField('Region', message.guild.region, inline = true)
      .addField('Invite', invite, inline = true);
    message.channel.send(serverinfoEmbed);
  });
}

module.exports.help = {
  name: "SERVERINFO"
}
