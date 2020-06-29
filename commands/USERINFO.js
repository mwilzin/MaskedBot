const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation
  let vTitle = ["Benutzerinformationen", "Userinfo"]
  let vNick = ["Spitzname", "Nickname"]
  let vServer = ["Im Server", "In Server"]
  let vGame = ["Spiel", "Game"]
  let vUser = ["Benutzer", "User"]
  let vServerJoined = ["Server beigetreten", "Joined Server"]
  let vDiscordJoined = ["Discord Account erstellt", "Joined Discord"]
  let vRoles = ["Rollen", "Roles"]

  con.query(`SELECT infos FROM serverSettings WHERE id = ${message.guild.id}`, (err, answ) => {
    if (answ[0].money === 0)return;
    let user = message.mentions.users.first() || message.author;
    const member = message.guild.member(user);

    const userinfoEmbed = new RichEmbed()
    .setTitle(vTitle[cur])
    .setColor("RANDOM")
    .setThumbnail(user.avatarURL)
    .addField(`${user.tag}`, `${user}`, inline = true)
    .addField("ID", `${user.id}`, inline = true)
    .addField(vNick[cur], `${member.nickname !== null ? `${member.nickname}` : 'None'}`, inline = true)
    .addField("Status:", `${user.presence.status}`, inline = true)
    .addField(vServer[cur], message.guild.name, true)
    .addField(vGame[cur], `${user.presence.game ? user.presence.game.name : 'None'}`, inline = true)
    .addField(vUser[cur], !user.bot, inline = true)
    .addField("Bot", user.bot, inline = true)
    .addField(vServerJoined[cur], `${member.joinedAt.getDate()}.${member.joinedAt.getMonth() + 1}.${member.joinedAt.getFullYear()}`, inline = true)
    .addField(vDiscordJoined[cur], `${user.createdAt.getDate()}.${user.createdAt.getMonth() + 1}.${user.createdAt.getFullYear()}`, inline = true)
    .addField(vRoles[cur], member.roles.map(roles => `${roles}`).join(', '), true);
    message.channel.send(userinfoEmbed);
  });
}

module.exports.help = {
  name: "USERINFO"
}
