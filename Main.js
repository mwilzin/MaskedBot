const Discord = require("discord.js");
const fs = require('fs');
const mysql = require('mysql');
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js');
const bot = new Discord.Client({disableEveryone: false})
const ytdl = require("ytdl-core");
const ffmpeg = require("ffmpeg");
bot.commands = new Discord.Collection();

// Datum
const today = new Date();
var minutes = today.getMinutes();
var hour = today.getHours();
var day = today.getDate();
var month = today.getMonth() + 1;
var year = today.getFullYear();

// JSON Files
const botSettings = require("./botsettings.json");

var dbConfig = {
  host: botSettings.dbConfig.host,
  user: botSettings.dbConfig.user,
  password: botSettings.dbConfig.password,
  database: botSettings.dbConfig.database,
};

var con;

function handleDisconnect() {
  con = mysql.createConnection(dbConfig); // Recreate the connection, since the old one cannot be reused.
  con.connect(function onConnect(err) { // The server is either down
    if (err) { // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 10000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
    if(!err) console.log('Connected to the Database.');
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  con.on('error', function onError(err) {
    if (err.code == 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else { // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

// Start Message
bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready! He's on ${bot.guilds.size} servers. ${bot.guilds.map(r => r.name)}`);
  bot.generateInvite(["ADMINISTRATOR"]).then(link => {
    console.log(link);
  });
  console.log(`${hour}:${minutes} Uhr ${day}.${month}.${year}`);
  console.log("-----------------------------------");
})

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if (jsfile.lenght <= 0) {
    console.log("Couldn't find commands!");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop:
    for (let c of channels) {
      let channelType = c[1].type;
      if (channelType === "text") {
        channelID = c[0];
        break channelLoop;
      }
    }
  let channel = bot.channels.get(guild.systemChannelID || channelID);
  const inviteEmbed = new RichEmbed()
  .setTitle('Danke/Thanks')
  .addField('Beschreibung', 'Dieser Bot hilft dir im täglichen Discord Alltag.', inline = true)
  .addField('Describtion', 'This bot helps you in your daily Discord everyday life.', inline = true)
  .setFooter('For changing the language send /botsettings and then language.')
  channel.send(inviteEmbed);
  console.log(`Bot joined ${guild}`);
});

bot.on("guildDelete", name => {
  console.log(`Bot left ${name}`);
})


bot.on('guildMemberAdd', member => {
  let server = member.guild;
  let user = member.displayName;
  con.query(`SELECT wlm, wm, wlchannel FROM serverSettings WHERE id = ${member.guild.id}`, (err, res) => {
  if (res[0].wlm == 0) return;
  // Send the message, mentioning the member
    let wmessage = res[0].wm * 1;
    const JoinEmbed = new RichEmbed()
      // Set the title of the field
      .setTitle(`${member.displayName} joined.`)
      // Set the color of the embed
      .setColor(00000000)
      // Set the main content of the embed
      .addField(`${wmessage}`, 'c:')
      .addField("Join", `${hour}:${minutes} Uhr ${day}.${month}.${year}`)
    // Send the embed to the same channel as the message
    bot.channels.get(res[0].wlchannel).send(JoinEmbed);
    console.log(`${member} joined the ${member.guild}.`);
  });
});
bot.on('guildMemberAdd', member => {
  let server = member.guild;
  let user = member.displayName;
  con.query(`SELECT wlm, lm, wlchannel FROM serverSettings WHERE id = ${member.guild.id}`, (err, res) => {
  if (res[0].wlm == 0) return;
  // Send the message, mentioning the member
    let lmessage = res[0].wm * 1;
    const LeaveEmbed = new RichEmbed()
      // Set the title of the field
      .setTitle(`${member.displayName} left.`)
      // Set the color of the embed
      .setColor(00000000)
      // Set the main content of the embed
      .addField(`${lmessage}`, 'c:')
      .addField("Joined", `${member.joinedAt.getDate()}.${member.joinedAt.getMonth() + 1}.${member.joinedAt.getFullYear()}`)
      .addField("Leave", `${hour}:${minutes} Uhr ${day}.${month}.${year}`)
    // Send the embed to the same channel as the message
    bot.channels.get(res[0].wlchannel).send(LeaveEmbed);
    console.log(`${member} left the ${member.guild}.`);
  });
});

// Activity
bot.on('ready', () => {
  let msg = ['mit den Zahlen.', 'created by triggeredLife#1182', '/help', 'Hilfe? /support', 'Support Server? discord.gg/WdHxE6C', `Schon auf ${bot.guilds.size} Servern!`]
  // let msg = ["Wartungsarbeiten hihi"]
  var cur = 0;
  setInterval(() => {
    bot.user.setActivity(msg[cur])
    cur++
    if (cur == msg.length) cur = 0;
  }, 12000)
})

bot.on('message', async message => { // when message is sent
  // Uppercase Args
  var msg = message.content.toUpperCase();
  let messageArray = msg.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  // Original Args
  let messageArrayO = message.content.split(" ");
  let cmdO = messageArrayO[0];
  let argsO = messageArrayO.slice(1);

  if (message.author.bot) return;
  if(message.channel.type === 'dm'){
    if(!msg.startsWith('SEND')){
      const privatMessageEmbed = new RichEmbed()
      .setTitle('New Message')
      .addField(`${message.author.username}#${message.author.discriminator}`, message.content)
      .setFooter(message.author.id)
      bot.users.get('459737180244410378').send(privatMessageEmbed);
    }
    if(msg.startsWith('SEND')){
      if(args[0] < 18) return message.channel.send("Diesen User gibt es nicht. / Couldn't find this user.")
      var user = bot.users.get(args[0]);
      if(!user) return message.channel.send("Diesen User gibt es nicht. / Couldn't find this user.")
      const privatMessageEmbed = new RichEmbed()
      .setTitle('New Message')
      .addField(`${message.author.username}#${message.author.discriminator}`, argsO.slice(1).join(" "))
      .setFooter(message.author.id)
      user.send(privatMessageEmbed);
      message.channel.send('✅')
    }
  }
  if (message.channel.type === "dm") return;

  // Cross Chat
  if(message.channel.name === 'global'){
    const globalEmbed = new RichEmbed()
    .setTitle(`${message.author.username}#${message.author.discriminator}`)
    .addField('New Message', message.content)
    .setFooter(`${message.guild}|${message.guild.id}`)
    message.delete()
    bot.guilds.forEach(guild => {
      var channel = guild.channels.find(c => c.name === "global")
      if(!channel) return
      channel.send(globalEmbed)
    });
    return
  }

  con.query(`SELECT * FROM userData WHERE id = ${message.author.id + message.guild.id}`, (err, rows) => {
    if (err) throw err;
    let sql;
    if (rows.length < 1) {
      sql = `INSERT INTO userData (id, bites, bytes, warns, worked, robbed, liked, disliked) VALUES ('${message.author.id + message.guild.id}', 0, 0, 0, 0, 0, 0, 0)`;
    } else return;
    con.query(sql);
  })

  con.query(`SELECT * FROM serverSettings WHERE id = ${message.guild.id}`, (err, rows) => {
    if (err) throw err;
    let sql;
    if (rows.length < 1) {
      sql = `INSERT INTO serverSettings (id, prefix, lang, money, min, max, infos, wlm, wlchannel, wm, lm) VALUES ('${message.guild.id}', '/', 0, 1, 50, 300, 1, 0, '', "Willkommen", "Schade, er hat uns verlassen.")`;
    } else return;
    con.query(sql);
  })

  setTimeout(function () {
    con.query(`SELECT prefix FROM serverSettings WHERE id = ${message.guild.id}`, (err, answ) => {
      let prefix = answ[0].prefix;

      if (!msg.startsWith(prefix)) return;

      // Commands
      con.query(`SELECT lang FROM serverSettings WHERE id = ${message.guild.id}`, (err, res) => {
        cur = res[0].lang;
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(bot, message, args, argsO, con, cur);
      });
    });
  }, 100);

  // Events
  // Convertor
  con.query(`SELECT bites, bytes FROM userData WHERE id = ${message.author.id + message.guild.id}`, (err, res) => {
    if(!res[0])return;
    if(err) return console.log(err);
    if (res[0].bites >= 10) {
      var REbytesPlus = res[0].bites / 10;
      var RbytesPlus = Math.floor(REbytesPlus);
      var bytesPlus = RbytesPlus * 10;
      var bitesMinus = res[0].bites - bytesPlus;
      con.query(`UPDATE userData SET bites = ${bitesMinus} WHERE id = ${message.author.id + message.guild.id}`);
      con.query(`UPDATE userData SET bytes = ${res[0].bytes + bytesPlus / 10} WHERE id = ${message.author.id + message.guild.id}`);
    }return;
  })
});

bot.login(botSettings.token);
