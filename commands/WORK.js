const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation
  let vNoWorkPossible = ["Du kannst zurzeit nicht Arbeiten. Versuche es später erneut.", "You can't work right now. Please try again later"]
  let vWorked = ["worked", "arbeitete"]
  let vWorkedAs = ["Als ein[e]", "As a(n)"]
  let vYouGot = ["Er/Sie bekam", "You got"]

  let policeman = ["Polizist(in)", "Policeman"]
  let teacher = ['Lehrer(in)', 'teacher']
  let homeless = ['Obdachlose(e)', 'homeless']
  let modder = ["Minecraft Modder", "minecraft modder"]
  let doctor = ["Arzt(Ärztin)", "Doctor"]
  let businessman = ["Geschäftsmann/Geschäftsfrau", "businessman"]
  let maskprogramer = ["Masked Bot Programmierer(in)", "masked bot programmer"]
  let youtuber = ["Youtuber(in)", "youtuber"]
  let streamer = ["Streamer(in)", "streamer"]
  let influencer = ["Influencer(in)", "influencer"]
  let seller = ["Verkäufer(in)", "sellerrerrrrrr"]
  let caregiver = ["Altenpfleger(in)", "caregiver"]
  let mechanic = ["Mechaniker(in)", "mechanic"]

  let jobs = [policeman[cur], teacher[cur], homeless[cur], modder[cur], doctor[cur], businessman[cur], maskprogramer[cur], youtuber[cur], streamer[cur], influencer[cur], seller[cur], caregiver[cur], mechanic[cur]]



  con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, answ) => {
    if (answ[0].money === 0)return;
    con.query(`SELECT worked, bites, bytes FROM userData WHERE id = ${message.author.id + message.guild.id}`, (err, res) => {
      con.query(`SELECT max, min FROM serverSettings WHERE id = ${message.guild.id}`, (err, resp) => {
        if (res[0].worked === 1) return message.reply(vNoWorkPossible[cur])
        var addWork = Math.floor((Math.random() * resp[0].max) + resp[0].min);
        var randomeWork = Math.floor((Math.random() * 1) + 0);

        con.query(`UPDATE userData SET bites = ${res[0].bites + addWork} WHERE id = ${message.author.id + message.guild.id}`);
        const workEmbed = new RichEmbed()
          .setTitle(`${message.author.username} ${vWorked[cur]}`)
          .addField(vWorkedAs[cur], `${jobs[randomeWork]}`)
          .addField(vYouGot[cur], `${addWork} Bites`);
        message.channel.send(workEmbed);
        con.query(`UPDATE userData SET worked = 1 WHERE id = ${message.author.id + message.guild.id}`);
        setTimeout(function() {
          con.query(`UPDATE userData SET worked = 0 WHERE id = ${message.author.id + message.guild.id}`);
        }, 86400000);
      });
    });
  });
}

module.exports.help = {
  name: "WORK"
}
