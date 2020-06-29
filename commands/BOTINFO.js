const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  var invite = await bot.channels.get("605769186240888872").createInvite(unique = true);
  con.query(`SELECT infos FROM serverSettings WHERE id = ${message.guild.id}`, (err, answ) => {
    if (answ[0].money === 0)return;
    //translation
    let vGuilds = ["Serveranzahl", "Guilds"];
    let vMembers = ["Benutzer", "Members"];
    let vAddBot = ["Füge den Bot zu deinem Server hinzu", "Add bot to your server"];
    let totalSeconds = (bot.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    con.query(`SELECT likes, dislikes FROM botData`, (err, res) => {
      const botinfoEmbed = new RichEmbed()
        .setTitle('Bot-Information')
        .addField('Version', '0.1.4', inline = true)
        .addField('Uptime', `${days} Days`, inline = true)
        .addField(vGuilds[cur], bot.guilds.size, inline = true)
        .addField(vMembers[cur], bot.users.size, inline = true)
        .addField('Likes', res[0].likes, inline = true)
        .addField('Dislikes', res[0].dislikes, inline = true)
        .addField('Support Server', 'https://discord.gg/spvGRJj')
        .addField(vAddBot[cur], 'http://bit.ly/MaskedBot');
      message.channel.send(botinfoEmbed);
    });
  });
}

module.exports.help = {
  name: "BOTINFO"
}
