const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation
  let vNoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
  let vUndefined = ["Unbestimmt", "Undefined"]
  let vNoBot = ["Ich kann keinen Bot warnen.", "I can't warn a bot"]
  let vTitle = ["Warnung", "Warns"]
  let vUser = ["Benutzer", "User"]
  let vReason = ["Grund", "Reason"]
  let vNumberWarns = ["Warnungen", "Warns"]


  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(vNoPerm[cur]);
  var toWarn = await bot.fetchUser(message.mentions.users.first()) || await bot.fetchUser(args[0]);
  if (toWarn === toWarn.bot) return message.channel.send(vNoBot[cur])
  let reason = argsO.slice(1).join(" ");
  if (!reason) reason = vUndefinedcur[cur];
    con.query(`SELECT warns FROM userData WHERE id = ${toWarn.id + message.guild.id}`, (err, res) => {
    con.query(`UPDATE userData SET warns = ${res[0].warns + 1} WHERE id = ${toWarn.id + message.guild.id}`);
    let vWarnMessage = [`Du wurdest gewarnt: ${reason}. \r\nDu wurdest schon ${res[0].warns + 1} mal gewarnt`, `You have been warned: ${reason}. \r\nYou've already been warned ${res[0].warns + 1} times.`]
    bot.users.get(toWarn.id).send(vWarnMessage[cur]);
    const channel = message.guild.channels.find(ch => ch.name === 'modlog');
    const warnEmbed = new RichEmbed()
      .setTitle(vTitle[cur])
      .addField(vUser[cur], `${toWarn}`)
      .addField('Admin', message.author)
      .addField(vReason[cur], reason)
      .addField(vNumberWarns[cur], res[0].warns + 1)
    channel.send(warnEmbed);
  });
}

module.exports.help = {
  name: "WARN"
}
