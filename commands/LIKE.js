const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  let error = ['Dein Feedback konnte nicht angenommen werden, da ein Fehler aufgetreten ist.', 'Your feedback could not be accepted because an error occurred.']
  let accepted = ['Danke für dein positives Feedback. Falls du noch wünsche hast, dann teile sie uns auf unserem Support Server mit.', 'Thank you for your positive feedback. If you have any wishes, please let us know on our support server.']
  con.query(`SELECT disliked, liked FROM userData`, (err, resp) => {
    con.query(`SELECT likes FROM botData`, (err, res) => {
    if(resp[0].liked === 1) return;
    if(resp[0].disliked === 1){
      message.channel.send('Ich bin hier')
      con.query(`UPDATE userData SET liked = 0 WHERE id = ${message.author.id + message.guild.id}`);
      con.query(`UPDATE botData SET likes = ${res[0].likes - 1}`);
    }
      con.query(`UPDATE botData SET likes = ${res[0].likes + 1}`);
      con.query(`UPDATE userData SET liked = 1 WHERE id = ${message.author.id + message.guild.id}`);
      if (err) {
        console.error(err);
        message.channel.send(error[cur])
      } else {
        message.channel.send(accepted[cur]);
        console.log(`${message.author.username} liked this Bot.`);
      }
    })
  });
}

module.exports.help = {
  name: "LIKE"
}
