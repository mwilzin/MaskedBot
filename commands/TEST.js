const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let server = message.guild;
  let user = message.displayName;
  con.query(`SELECT wlm, lm, wlchannel FROM serverSettings WHERE id = ${message.guild.id}`, (err, res) => {
  if (res[0].wlm == 0) return;
  // Send the message, mentioning the member
    let lmessage = `${res[0].lm}`;
    message.channel.send(`${user} test`);
  });
}

module.exports.help = {
  name: "TEST"
}
