const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation
  let lostAll = ["Uff, du hast alles verloren.", "Oh no, you lost everything."]
  let win = ["JUHU! DU HAST GEWONNEN!", "YIPPIE! YOU WIN!"]

  var randome = Math.floor((Math.random() * 3) + 1);
  if (randome < 3) {
    message.channel.send(lostAll[cur])
    con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, res) => {
      if(res[0].money === 1){
        con.query(`UPDATE userData SET bites = 0 WHERE id = ${message.author.id + message.guild.id}`);
        con.query(`UPDATE userData SET bytes = 0 WHERE id = ${message.author.id + message.guild.id}`);
      };
    });
  }
  if (randome === 3) {
    message.channel.send(win[cur])
    con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, res) => {
      if(res[0].money === 1){
        con.query(`SELECT bites, bytes FROM userData WHERE id = ${message.author.id + message.guild.id}`, (err, res) => {
          con.query(`UPDATE userData SET bites = ${res[0].bites * 2} WHERE id = ${message.author.id + message.guild.id}`);
          con.query(`UPDATE userData SET bytes = ${res[0].bytes * 2} WHERE id = ${message.author.id + message.guild.id}`);
        });
      };
    });
  }
}

module.exports.help = {
  name: "AON"
}
