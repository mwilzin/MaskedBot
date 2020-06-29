const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {

  //translation

  let totalSeconds = (bot.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600) - days * 24;
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let vUptime = [`Der Bot ist seit ${days} Tag(en), ${hours} Stunde(n) und ${minutes} Minute(n) online.`, `The bot is online for ${days} day(s), ${hours} hours and ${minutes} minutes.`]
  message.channel.send(vUptime[cur]);
}

module.exports.help = {
  name: "UPTIME"
}
