const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  // Translation
  // scissors
  let scissorsDraw = ['Unentschieden! Ich hatte auch Schere.', 'Draw! I also had scissors.']
  let scissorsLost = ['Du hast verloren! Ich hatte Stein.', 'You lost! I had rock.']
  let scissorsWon = ['Du hast gewonnen! Ich hatte Papier.', 'You won! I had paper.']
  // stone
  let stoneWon = ['Du hast gewonnen! Ich hatte Schere.', 'You won! I had scissors.']
  let stoneDraw = ['Unentschieden! Ich hatte auch Stein.', 'Draw! I also had stone.']
  let stoneLost = ['Du hast verloren! Ich hatte Papier.', 'You lost! I had paper.']
  // paper
  let paperLost = ['Du hast verloren! Ich hatte Schere', 'You lost! I had scissors.']
  let paperDraw = ['Unentschieden! Ich hatte auch Papier.', 'Draw! I also had paper.']
  let paperWon = ['Du hast gewonnen! Ich hatte Stein.', 'You won! I had rock.']
  con.query(`SELECT bytes FROM userData WHERE id = ${message.author.id + message.guild.id}`, (err, res) => {
    var randome = Math.floor((Math.random() * 3) + 1);
    // 1 = Schere
    // 2 = Stein
    // 3 = Papier
    if (args[0] === 'SCHERE' || args[0] === 'SCISSORS') {
      if (randome == 1) return message.channel.send(scissorsDraw[cur])
      if (randome == 2) return message.channel.send(scissorsLost[cur])
      if (randome == 3) {
        message.channel.send(scissorsWon[cur])
        con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, resp) => {
          if (resp[0].money === 1) {
            con.query(`UPDATE userData SET bytes = ${res[0].bytes + 1} WHERE id = ${message.author.id + message.guild.id}`);
          }
        });
      }
      return;
    }
    if (args[0] === 'STEIN' || args[0] === 'STONE') {
      if (randome == 1) {
        message.channel.send(stoneWon[cur])
        con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, resp) => {
          if (resp[0].money === 1) {
            con.query(`UPDATE userData SET bytes = ${res[0].bytes + 1} WHERE id = ${message.author.id + message.guild.id}`);
          }
        });
      }
      return;
      if (randome == 2) return message.channel.send(stoneDraw[cur])
      if (randome == 3) return message.channel.send(stoneLost[cur])
    }
    if (args[0] === 'PAPIER' || args[0] === 'PAPER') {
      if (randome == 1) return message.channel.send(paperLost[cur])
      if (randome == 3) return message.channel.send(paperDraw[cur])
      if (randome == 2) {
        message.channel.send(paperWon[cur])
        con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, resp) => {
          if (resp[0].money === 1) {
            con.query(`UPDATE userData SET bytes = ${res[0].bytes + 1} WHERE id = ${message.author.id + message.guild.id}`);
          }
        });
      }
      return;
    }
    if (!args[0]) return message.channel.send('Bitte schreibe hinter /ssp noch dein Item.')
    message.channel.send(`Bitte schreibe statt ${args[0]} Schere, Stein oder Papier.`)
  });
}

module.exports.help = {
  name: "SSP"
}
