const Discord = require("discord.js");
const ytdl = require('ytdl-core')

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  var servers = {}

  function play(connection, message){
    servers.dispatcher = connection.playStream(ytdl(servers.queue[0], {filter: "audioonly"}));
    servers.queue.shift();
    servers.dispatcher.on("end", function(){
      if(servers.queue[0]){
        play(connection, message)
      }else{
        connection.disconnect()
      }
    })
  }

  if(!argsO[0]) {
    message.channel.send('Bitte gebe einen Link an.')
    return;
  }
  if(!message.member.voiceChannel){
    message.channel.send('Du musst in einem Sprach Kanal sein.')
    return;
  }
  if(!servers[message.guild.id]) servers[message.guild.id] = {
    queue: []
  }
  var servers = servers[message.guild.id]
  servers.queue.push(argsO[0])
  if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
    play(connection, message)
  })
}

module.exports.help = {
  name: "PLAY"
}
