const Discord = require("discord.js");

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  con.query(`SELECT money FROM serverSettings WHERE id = ${message.guild.id}`, (err, res) => {
    if(res[0].money === 0)return;
    let userAddMsg = message.mentions.members.first().user.id;
    var addMsg = args[0];
    var add = addMsg * 1;

    // translation
    let vNoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
    let vToMuchBites = [`Entschuldigung, ${message.author} ${add} Bites sind zu viele.` ,`Sorry ${message.author} ${add} Bites are too much.`]
    let vMessageAddedBites = [`${add} Bites <@${userAddMsg}> hinzugefügt` ,`Added <@${userAddMsg}> ${add} Bites!`]

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(vNoPerm[cur]);
    if (add > 1000) return message.channel.send(vToMuchBites[cur]);
    console.log(`${message.author.username} added ${add} Bites to ${userAddMsg}`);
    message.channel.send(vMessageAddedBites[cur]);
    con.query(`SELECT  FROM userData WHERE id = ${userAddMsg + message.guild.id}`, (err, resp) => {
    // make sure to check the error
    con.query(`UPDATE userData SET bites = ${resp[0].bites + add} WHERE id = ${userAddMsg + message.guild.id}`);
  });
  });
}

module.exports.help = {
  name: "ADD"
}
