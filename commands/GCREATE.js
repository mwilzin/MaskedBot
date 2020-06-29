const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let NoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
  let noChannel = ['Bitte gebe einen Kanal an.', 'Please specify a channel.']
  let noGiveaway = ['Bitte gebe einen Gewinn an.', 'Please specify a giveaway.']
  let createTitle = ['Geschenk wurde erstellt.', 'Giveaway was created.']
  let giveawayNew = ['NEUES GIVEAWAY', 'NEW GIVEAWAY']
  let giveawayGiveaway = ['Geschenk', 'Giveaway']
  let giveawayTimeTitle = ['Dauer', 'Duration']
  let giveawayReact = ['Reagiere mit 🎉 um an dem Event teilzunehmen.', 'React with 🎉 to participate in the event.']
  let giveawayWinner = ['Gewinner', 'Winner']
  let giveawayEnd = ['GIVEAWAY BEENDET', 'GIVEAWAY FINISHED']
  if(!message.member.hasPermission("MANAGE_GUILD"))return message.channel.send(NoPerm[cur]);
  var giveawayChannel = message.mentions.channels.first();
  if(!giveawayChannel)return message.channel.send(noChannel[cur])
  var durationM = args[1];
  if(!durationM) durationM = 0;
  var durationH = args[2];
  if(!durationH) durationH = 0;
  var durationD = args[3];
  if(!durationD)  durationD = 0;
  let giveaway = argsO.slice(4).join(" ");
  if(!giveaway)return message.channel.send(noGiveaway[cur]);

  var tdurationD= durationD * 86400;
  var tdurationH = durationH * 3600;
  var tdurationM = durationM * 60;
  var tdurationS = tdurationD + tdurationH + tdurationM;
  var tduration = tdurationS * 1000;
  let giveawayTime = [`${durationM}:${durationH} und ${durationD} Tage.`, `${durationM}:${durationH} and ${durationD} days.`]
  const createGiveawayEmbed = new RichEmbed()
  .setTitle(createTitle[cur])
  .addField(giveawayGiveaway[cur], giveaway)
  .addField(giveawayTimeTitle[cur], giveawayTime[cur])
  message.channel.send(createGiveawayEmbed);

  const giveawayEmbed = new RichEmbed()
  .setTitle(giveawayNew[cur])
  .addField(giveawayGiveaway[cur], giveaway)
  .addField(giveawayTimeTitle[cur], giveawayTime[cur])
  .setFooter(giveawayReact[cur]);
  giveawayChannel.send(giveawayEmbed).then(msg => {
    msg.react('🎉')
    const filter = (reaction) => reaction.emoji.name === '🎉';
    msg.awaitReactions(filter, { time: tduration })
      .then(collected => {
        var winner = Math.floor((Math.random() * collected.size) + 1);
        var reactions = collected.first().users.map(r => r.id);
        let giveawayWinnerMessage = [`<@${reactions[winner]}> hat ${giveaway} gewonnen.`, `<@${reactions[winner]}> won ${giveaway}.`]
        giveawayChannel.send(giveawayWinnerMessage[cur]);
        const giveawayEmbed = new RichEmbed()
        .setTitle(giveawayEnd[cur])
        .addField(giveawayGiveaway[cur], giveaway)
        .addField(giveawayWinner[cur], `<@${reactions[winner]}>`)
        msg.edit(giveawayEmbed);
      })
      .catch(console.error);
  });
}

module.exports.help = {
  name: "GCREATE"
}
