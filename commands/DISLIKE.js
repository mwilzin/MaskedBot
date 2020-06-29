const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let error = ['Dein Feedback konnte nicht angenommen werden, da ein Fehler aufgetreten ist.', 'Your feedback could not be accepted because an error occurred.']
  let accepted = ['Danke für dein negatives Feedback. Wenn du uns helfen willst den Bot zu verbessern, dann trete doch unserem Server bei.', 'Thanks for your negative feedback. If you want to help us improve the bot, then join our server.']
  con.query(`SELECT disliked, liked FROM userData`, (err, resp) => {
    con.query(`SELECT dislikes FROM botData`, (err, res) => {
    if(resp[0].disliked === 1) return;
    if(resp[0].liked === 1) {
      message.channel.send('Ich bin hier')
      con.query(`UPDATE userData SET liked = 0 WHERE id = ${message.author.id + message.guild.id}`);
      con.query(`UPDATE botData SET dislikes = ${res[0].dislikes - 1}`);
    }
      con.query(`UPDATE botData SET dislikes = ${res[0].dislikes + 1}`);
      con.query(`UPDATE userData SET disliked = 1 WHERE id = ${message.author.id + message.guild.id}`);
      if (err) {
        console.error(err);
        message.channel.send(error[cur])
      } else {
        message.channel.send(accepted[cur]);
        console.log(`${message.author.username} disliked this Bot.`);
      }
    });
  });
}

module.exports.help = {
  name: "DISLIKE"
}
