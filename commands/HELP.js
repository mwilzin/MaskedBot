const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  // Translation
  // Normal
  let main = ['Haupt Befehle', 'Main Commands']
  let help = ['Um alle Befehle zu sehen.', 'To see all the commands.']
  let uptime = ['Schaue wie lang der Bot schon Online ist.', 'See how long the bot is already online.']
  let support = ['Um dich an den Support vom Server zu wenden.', 'To contact support from the server.']
  let like = ['Um den Bot positiv zu Bewerten.', 'To rate the bot positively.']
  let dislike = ['Um den Bot negativ zu Bewerten.', 'To rate the bot negatively.']
  let feedback = ['Um dem Bot ein Feedback zu geben.', 'To give the bot feedback.']
  let report = ['Melde einen User.', 'Report a user.']
  let setnick = ['Ändere deinen Nickname auf dem Server.', 'Change your nickname on the server.']
  let ping = ['Um die Latenz zwischen dir und dem Bot herauszufinden.', 'To find out the latency between you and the bot.']
  let moin = ['Nur zum Spaß', 'Just for Fun']
  let created = ['Erstellt von triggeredLife#1182', 'Created by triggeredLife#1182']
  // Infos
  let userinfo = ['Finde alles über ein Mitglied des Servers heraus.', 'Find out everything about a member of the server.']
  let botinfo = ['Finde informationen über den Bot heraus.', 'Get informations about the bot.']
  let serverinfo = ['Finde informationen über den Server heraus.', 'Get informations about the server.']
  // Money
  let moneyEm = ['Geld', 'Money']
  let money = ['Um deinen Aktuellen Kontostand zu sehen.', 'To see your current account balance.']
  let work = ['Um Geld zu verdienen.', 'To earn money.']
  let rob = ['Um anderen Leuten Geld zu klauen 😉', 'To steal money from other people 😉']
  // Games
  let games = ['Spiele', 'Games']
  let ssp = ['Schere, Stein, Papier', 'Scissors, stone, paper']
  let aon = ['Alles oder Nichts', 'Everything or nothing']
  // Team
  let team = ['Befehle für das Team', 'Commands for the Team']
  let botsettings = ['Passe den Bot an deine Wünsche an.', 'Customize the bot.']
  let add = ['Um einem Benutzer Bites Hinzuzufügen.', 'To add bites to a user.']
  let gcreateTitle = ['gcreate <Kanal> <Dauer in Minuten> <Dauer in Stunden> <Dauer in Tagen> <Gewinn>', 'gcreate <Channel> <Duration in Minutes> <Duration in Hours> <Duration in Day> <Gewinn>']
  let gcreate = ['Um ein Giveaway zu starten.', 'To start a giveaway.']
  let say = ['Lasse deinen Text vom Bot in den Kanal schreiben.', "Let's write your text in the channel."]
  let clear = ['Lösche eine Bestimmte Anzahl von Nachrichten in diesem Chat.', 'Delete a certain number of messages in this chat.']
  let warn = ['Warne einen User vom Server.', 'Warn a user from the server.']
  let kick = ['Kicke einen User vom Server.', 'Kick a user off the server.']
  let ban = ['Banne einen User vom Server.', 'Ban a user off the server.']
  let unban = ['Unbanne einen User vom Server.', 'Unban a user from the server.']
  con.query(`SELECT prefix, money, infos FROM serverSettings WHERE id = ${message.guild.id}`, (err, res) => {
    const helpEmbed = new RichEmbed()
    // Set the title of the field
    .setTitle(main[cur])
    // Set the color of the embed
    .setColor(0xFF0000)
    // Set the main content of the embed
    .addField("Prefix: ", res[0].prefix)
    .addField('help', help[cur])
    .addField('uptime', uptime[cur])
    .addField('support <Text>', support[cur])
    .addField('like', like[cur])
    .addField('dislike', dislike[cur])
    .addField('feedback <Text>', feedback[cur])
    .addField('report <User> <Reason>', report[cur])
    .addField('setnick <Name>', setnick[cur])
    .addField('Ping', ping[cur])
    .addField('Moin', moin[cur])
    .setTimestamp()
    .setFooter(created[cur]);
    const infosEmbed = new RichEmbed()
    .setTitle('Infos')
    .setColor(0xFF0000)
    .addField('userinfo <Ping>', userinfo[cur])
    .addField('botinfo', botinfo[cur])
    .addField('serverinfo', serverinfo[cur]);
    const moneyEmbed = new RichEmbed()
    .setTitle(moneyEm[cur])
    .setColor(0xFF0000)
    .addField('money', money[cur])
    .addField('work', work[cur])
    .addField('rob <Ping>', rob[cur])
    const gameEmbed = new RichEmbed()
    // Set the title of the field
    .setTitle(games[cur])
    // Set the color of the embed
    .setColor(0xFF0000)
    // Set the main content of the embed
    .addField('ssp', ssp[cur])
    .addField('aon', aon[cur])
    .setTimestamp()
    .setFooter('Created by triggeredLife#1182');
    // Send the embed to the same channel as the message
    message.channel.send(helpEmbed);
    if(res[0].infos === 1){
    message.channel.send(infosEmbed);
    }
    if(res[0].money === 1){
    message.channel.send(moneyEmbed);
    }
    message.channel.send(gameEmbed);
  });
  setTimeout(function () {
    const helpEmbedAdmin = new RichEmbed()
    .setColor(0xFF0000)
    .addField(team[cur], 'v.0.2.0')
    .addField('botsettings', botsettings[cur])
    .addField('add <Points> <User Id/Ping>', add[cur])
    .addField(gcreateTitle[cur], gcreate[cur])
    .addField('say <Text>', say[cur])
    .addField('clear <Anzahl an Nachrichten>', clear[cur])
    .addField('warn <Ping/User ID> <Reason>', warn[cur])
    .addField('kick <Ping/User ID> <Reason>', kick[cur])
    .addField('ban <Ping/User ID> <Reason>', ban[cur])
    .addField('unban <User ID> <Reason>', unban[cur])
    if(message.member.hasPermission("ADMINISTRATOR")){
      message.channel.send(helpEmbedAdmin)
    }
  }, 100);
}

module.exports.help = {
  name: "HELP"
}
