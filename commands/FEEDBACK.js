const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let accepted = ['Vielen Danke für dein Feedback. Es wird sofort an den Entwickler weitergeleitet.', 'Thank you for your feedback. It will be immediately forwarded to the developer.']
  message.channel.send(accepted[cur])
  const feedbackEmbed = new RichEmbed()
  .setTitle('Feedback')
  .addField('Von', message.author.username, inline = true)
  .addField('In', message.guild.name, inline = true)
  .addField('Das Feedback', argsO.join(" "));
  bot.channels.get('608454021870780426').send(feedbackEmbed);
  console.log(`New Feedback from ${message.author.username}`);
}

module.exports.help = {
  name: "FEEDBACK"
}
