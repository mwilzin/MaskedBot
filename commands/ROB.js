const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  // Translation
  let notYourself = ["Du kannst dich nicht selbst beklauen.", 'You can not steal yourself.']
  let notYet = ['Du kannst zurzeit nicht Klauen. Versuche es später erneut.', 'You can not rob at the moment. Try again later.']
  let win = ['Du hast gewonnen.', 'You won']
  let lost = ['Du hast verloren.', 'You lost.']
  con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, resp) => {
    if(resp[0].money === 0)return;
    var UserToRob = message.mentions.users.first().id;
    if(UserToRob === message.author.id)return message.channel.send(notYourself[cur])
    con.query(`SELECT bites, bytes, robbed FROM userData WHERE id = ${message.author.id + message.guild.id}`, (err, res) => {
      if(res[0].robbed === 1)return message.reply(notYet[cur])
      con.query(`SELECT bites, bytes FROM userData WHERE id = ${UserToRob + message.guild.id}`, (err, answ) => {
        var MaxMoneyToRob = answ[0].bytes;
        var MaxMoneyToLose = res[0].bytes;
        var CanRob = Math.floor((Math.random() * 5) + 0);
        // Can Rob
        if(CanRob < 3){
          var MoneyToRob = Math.floor((Math.random() * MaxMoneyToRob) + 1);
          let winMessage = [`Du hast ${MoneyToRob} Bytes erfolgreich geraubt.`, `You have successfully stolen ${MoneyToRob} bytes.`]
          const robEmbed = new RichEmbed()
          .setTitle('Rob')
          .addField(win[cur], winMessage[cur]);
          message.channel.send(robEmbed);
          con.query(`UPDATE userData SET bites = ${res[0].bites + MoneyToRob} WHERE id = ${message.author.id + message.guild.id}`);
          con.query(`UPDATE userData SET bites = ${answ[0].bites - MoneyToRob} WHERE id = ${UserToRob + message.guild.id}`);
        }else {
          // Can't rob
          var MoneyToLose = Math.floor((Math.random() * MaxMoneyToLose) + 1);
          let lostMessage = [`Du wurdest geschnappt und musst ${MoneyToLose} Bytes zahlen.`, `You got caught and have to pay ${MoneyToLose} bytes.`]
          const loseEmbed = new RichEmbed()
          .setTitle('Rob')
          .addField(lost[cur], lostMessage[cur]);
          message.channel.send(loseEmbed);
          con.query(`UPDATE userData SET bytes = ${res[0].bytes - MoneyToLose} WHERE id = ${message.author.id + message.guild.id}`);
        }
        con.query(`UPDATE userData SET robbed = 1 WHERE id = ${message.author.id + message.guild.id}`);
        setTimeout(function () {
          con.query(`UPDATE userData SET robbed = 0 WHERE id = ${message.author.id + message.guild.id}`);
        }, 86400000);
      });
   });
  });
}

module.exports.help = {
  name: "ROB"
}
