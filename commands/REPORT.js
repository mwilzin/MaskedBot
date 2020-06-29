const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  // Translation
  let noReason = ['Bitte gebe einen Grund an (Wenn möglich mit passenden Links zu Textstellen im Kanal.).', 'Please give a reason (if possible with matching links to passages in the channel.).']
  let noUser = ['Bitte gebe einen User an, den du ihn melden willst.', 'Please enter a user you want to report.']
  let thanks = ['Vielen dank für den report. Wir werden uns bald darum kümmern.', "Thank you for the report. We'll take care of it as soon as possible."]
  let resaonEmbed = ['Grund', 'Reason']
  let help = ['Hilfe:', 'Help:']
  let helpMessage = ['Der Fall wird jetzt überprüft und es wird Zeitnah ein Supporter dem Server beitreten, der sich alles anschaut. Bitte löschen sie keine Nachrichten, ansonsten kann nicht bewießen werden, dass er etwas angestellt hat.', 'The case is now being reviewed and it will be up close a supporter to join the server, who looks at everything. Please do not delete any messages, otherwise you will not be aware that he has done something.']
  var reportMember = message.mentions.users.first();
  let reason = argsO.slice(1).join(" ");
  if(!reason)return message.channel.send(noReason[cur]);
  if (!reportMember) return message.channel.send(noUser[cur])
  message.channel.send(thanks[cur])
  if (message.member.hasPermission("ADMINISTRATOR")) {
    if (!message.guild.roles.find(role => role.name === "Muted"))
    try {
      muterole = await message.guild.createRole({
        name: 'Muted',
        color: 'GRAY',
        permissions: []
      });
      message.guild.channels.forEach(async(channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        })
      })
    } catch (e) {
      console.log(e);
    }
    setTimeout(function() {
      const muteRole = message.guild.roles.find(role => role.name === "Muted");
      message.guild.member(reportMember).addRole(muteRole)
    }, 1000);
    // Server Modlog
    const reportAdminEmbed = new RichEmbed()
    .setTitle('Report')
    .addField('User', reportMember)
    .addField('Admin', message.author)
    .addField(resaonEmbed[cur], reason)
    .addField(help[cur], helpMessage[cur]);
    const channel = message.guild.channels.find(ch => ch.name === 'modlog');
    if(!channel)channel = message.channel;
    channel.send(reportAdminEmbed);
    // Sup Server modlog
    var invite = await message.channel.createInvite(unique = true);
    const reportSupEmbed = new RichEmbed()
    .setTitle('Report')
    .addField('User', reportMember)
    .addField('Admin', message.author)
    .addField('Server', message.guild.name)
    .addField('Grund', reason)
    .addField('Invite', invite, inline = true);
    bot.channels.get('604040125369942057').send(reportSupEmbed);
  }else {
      // Server Modlog
      const reportAdminEmbed = new RichEmbed()
      .setTitle('Report')
      .addField('User', reportMember)
      .addField('User', message.author)
      .addField(resaonEmbed[cur], reason)
      .addField(help[cur], helpMessage[cur]);
      const channel = message.guild.channels.find(ch => ch.name === 'modlog');
      if(!channel)channel = message.channel;
      channel.send(reportAdminEmbed);
      // Sup Server modlog
      var invite = await message.channel.createInvite(unique = true);
      const reportSupEmbed = new RichEmbed()
      .setTitle('Report')
      .addField('User', reportMember)
      .addField('User', message.author)
      .addField('Server', message.guild.name)
      .addField('Grund', reason)
      .addField('Invite', invite, inline = true);
      bot.channels.get('604040125369942057').send(reportSupEmbed);
  }
}

module.exports.help = {
  name: "REPORT"
}
