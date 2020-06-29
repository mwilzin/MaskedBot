const Discord = require("discord.js");
const ytdl = require('ytdl-core')

module.exports.run = async (bot, message, args, argsO, con, cur) => {
if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
		if (!servers.queue) return message.channel.send('There is nothing playing that I could stop for you.');
		servers.queue = [];
		servers.connection.dispatcher.end('Stop command has been used!');
}

module.exports.help = {
  name: "SKIP"
}
