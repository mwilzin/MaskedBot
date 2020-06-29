const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let owner = ["Konto Inhaber", 'Account owner']
  con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, resp) => {
    if(resp[0].money === 0)return;
    con.query(`SELECT bites,bytes FROM userData WHERE id = ${message.author.id + message.guild.id}`, (err, res) => {
      const moneyEmbed = new RichEmbed()
      // Set the title of the field
      .setTitle('Bank')
      // Set the color of the embed
      .setColor(0xF1C40F)
      // Set the main content of the embed
      .addField(owner[cur], message.author.username)
      .addField("Bytes", res[0].bytes)
      .addField("Bites", res[0].bites)
      // Send the embed to the same channel as the message
      message.channel.send(moneyEmbed).then(msg => {msg.delete(5000)});
    });
  });
}

module.exports.help = {
  name: "MONEY"
}
