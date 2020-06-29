const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js')

module.exports.run = async (bot, message, args, argsO, con, cur) => {
  con.query(`SELECT prefix, lang, money, min, max, infos, lm, wm, lm, wlchannel FROM serverSettings WHERE id = ${message.guild.id}`, (err, res) => {
    // Translation
    let NoPerm = ["Du darfst diesen Befehl nicht benutzen.", "You can't use that command."]
    let Settings = ["Einstellungen", "Settings"]
    let prefix = ['Ändere das Prefix vom Bot', 'Change the prefix of the bot.']
    let language = ['Ändere die Sprache vom Bot', 'Change the language of the bot.']
    let modules = ['Schalte Module Geld, Join/Leave Nachricht und Infos an oder aus.', 'Switch the module money, Leave/Join and infos on or off.']
    let SettingsReturn = ['Breche den Vorgang ab.', 'Exit the settings menu']
    // Return
    let returnMessage = ['Der Vorgang wurde abgebrochen.', 'Exited the menu.']
    // Prefix
    let prefixInfoMessage = ['Bitte sende dein gewünschtes Prefix in den Chat (Maximal eine Stelle)', 'Please send your desired prefix (maximum one character)']
    let prefixMore = ['Das Prefix darf maximal eine Stelle besitzen.', 'The prefix may have a maximum of one character.']
    // Language
    let languageInfoTitle = ['Bitte lege die Sprache des Servers fest.', 'Pleace choose the language of the server.']
    let german = ['Deutsch', 'German']
    let english = ['Englisch', 'English']
    let notEnDE = ['Bitte gebe "DE" oder "EN" ein.', 'Please enter "DE" or "EN".']
    // Modules
    let modulesTitle = ['Module', 'Modules']
    let modulesInfos = ['(De)aktiviere das Info Moduk. Beinhaltet userinfo, botinfo und serverinfo.', '(De)activate the infos module. Contains userinfo, botinfo and serverinfo.']
    let modulesWLM = ['(De)aktiviere die Welcome/Leave Nachricht, \r\noder ändere den Text der Willkommens/Verlassens Nachrichten.', '(De)activate the Welcome/Leave Message, \r\nor change the text of the Welcome/Leave Message.']
    let modulesMoney = ['(De)aktiviere das Geld Modul, \r\noder ändere den maximalen und minimalen Betrag, den man bei Worke verdienen kann.', '(De)activate the money module, \r\nor change the maximum and minimum amount you can earn at Worke.']
    // Infos
    let infosTitle = ['Info Modul', 'Info module']
    let infosActivateEmbed = ['Zum aktiviern des Modules', 'To activate the info module.']
    let infosDeactivateEmbed = ['Zum deaktiviern des Modules', 'To deactivate the info module.']
    let infosModuleActivate = ['Das Info Modul wurde Aktiviert.', 'The info module has been activated.']
    let infosModuleDeactivate = ['Das Info Modul wurde Deaktiviert.', 'The info module has been deactivated.']
    // WLM
    let wlTitleEmbed = ['Willkommens/Verlassens Modul', 'Welcome/LeaveEmbed Module']
    let wlEmbed = ['(De)aktiviere die Willkommens/Verlassens Nachricht', '(De)activate the Welcome/Leave Message.']
    let wlcembed = ['Setze den Willkommens/Verlassens Nachrichten Kanal.', 'Set the Welcome / Leave messages channel.']
    let wmembed = ['Ändere die Begrüßungs Nachricht.', 'Change the welcome message.']
    let lmembed = ['Ändere die Verabschiedungs Nachricht', 'Change the leave message.']
    let wlmNoChannel = ['Lege zuerst einen Kanal zum senden der Nachricht fest.', 'First set a channel to send the message.']
    let wlmTitleEmbed = ['WLM (De)aktivieren.', '(De)activate WLM.']
    let wlmActivateEmbed = ['Zum aktivieren des Modules', 'To activate the module']
    let wlmDeactivateEmbed = ['Zum deaktivieren des Modules', 'To deactivate the module']
    let wlmActivate = ['Das Willkommens/Verlassens Modul wurde aktiviert.', 'The Welcome/Leave Module has been activated.']
    let wlmDeactivate = ['Das Willkommens/Verlassens Modul wurde deaktiviert.', 'The Welcome/Leave Module has been deactivated.']
    let wlcInfo = ['Pinge einen Kanal, um ihn als Willkommens/Verlassens Kanal festzulegen.', 'Mention a channel to set it as a Welcome/Leave channel.']
    let wlNotExist = ['Bitte sende einen existierenden Kanal.', 'Please send an existing channel.']
    let wmTitle = ['Begrüßungs Nachricht', 'Welcome Message']
    let wlVars = ['Variablen', 'Variables']
    let wlVarsDes = ['Mit diesen kannst du deine Nachricht lebendiger machen.', 'With these you can make your message more lively.']
    let wlUser = ['Gibt den Namen vom User an.', 'Specifies the name of the user.']
    let wlServer = ['Gibt den Namen vom Server an.', 'Specifies the name of the server.']
    let lmTitle = ['Verabschiedungs Nachricht', 'Leave Message']
    let wlmUpdated = ['Die Nachricht wurde geupdatet.', 'The message has been updated.']
    let moneyTitle = ['Geld Modul', 'Money Module']
    let moneyWorkEmbed = ['Setze das minimum und maximum vom Einkommen bei work.', 'Set the minimum and maximum of income at work.']
    let moneyActivateEmbed = ['Zum aktiviern des Modules', 'To activate the module']
    let moneyDeactivateEmbed = ['Zum deaktiviern des Modules', 'To deactivate the module']
    let moneyActivate = ['Das Money Modul wurde Aktiviert.', 'The Module has been activated']
    let moneyDeactivate = ['Das Money Modul wurde Deaktiviert.', 'The Module has been deactivated']
    let moneyWorkMin = ['Gebe das minimum vom Einkommen an.', 'Enter the minimum income.']
    let moneyWorkMax = ['Gebe das maximum vom Einkommen an.', 'Enter the maximum income.']
    let canceled = ['Der Vorgang wurde abgebrochen, bitte versuche es nochmal.', 'The process was aborted, please try again.']
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(NoPerm[cur]);
    const settingsEmbed = new RichEmbed()
      .setTitle(Settings[cur])
      .addField('Prefix', prefix[cur])
      .addField('Language', language[cur])
      .addField('Modules', modules[cur])
      .addField('Return', SettingsReturn[cur])
    message.channel.send(settingsEmbed)
    const filter = m => m.author.id === message.author.id;
    message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected => {
      var collectedMsg = collected.first().content.toUpperCase();
      // cancel
      if (collectedMsg === 'RETURN') return message.channel.send(returnMessage[cur]);
      // prefix
      if (collectedMsg === 'PREFIX') {
        message.channel.send(prefixInfoMessage[cur])
        const filter2 = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter2, { max: 1, time: 60000 }).then(collected2 => {
          if (!collected2.first().content.length > 1) return message.channel.send(prefixMore[cur]);
          con.query(`UPDATE serverSettings SET prefix = "${collected2.first().content}" WHERE id = ${message.guild.id}`);
          let prefixNew = [`@everyone das neue Prefix ist jetzt ${collected2.first().content}`, `@everyone the new prefix is ${collected2.first().content}`]
          message.channel.send(prefixNew[cur])
        });
      }
      // language
      if (collectedMsg === 'LANGUAGE') {
        const languageEmbed = new RichEmbed()
          .setTitle(languageInfoTitle[cur])
          .addField('DE', german[cur])
          .addField('EN', english[cur])
        message.channel.send(languageEmbed)
        const filter2 = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter2, { max: 1, time: 60000 }).then(collected2 => {
          if (collected2.first().content.toUpperCase() === 'EN' || collected2.first().content.toUpperCase() === 'DE'){
          if (collected2.first().content.toUpperCase() === 'EN') {
            message.channel.send("Ok, I'm now an english Bot.")
            con.query(`UPDATE serverSettings SET lang = 1 WHERE id = ${message.guild.id}`);
          }
          if (collected2.first().content.toUpperCase() === 'DE') {
            message.channel.send(`Ok, ich bin jetzt ein deutscher Bot.`);
            con.query(`UPDATE serverSettings SET lang = 0 WHERE id = ${message.guild.id}`);
          }
        }else{
          message.channel.send(notEnDE[cur]);
        }return;
        });
      }
      // Modules
      if (collectedMsg === 'MODULES') {
        const modulesEmbed = new RichEmbed()
          .setTitle(modulesTitle[cur])
          .addField('Infos', modulesInfos[cur])
          .addField('WLM', modulesWLM[cur])
          .addField('Money', modulesMoney[cur])
        message.channel.send(modulesEmbed)
        const filter = m => m.author.id === message.author.id;
        message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected2 => {
          var collectedMsg2 = collected2.first().content.toUpperCase();
          if(collectedMsg2 === 'INFOS'){
            const infosModuleEmbed = new RichEmbed()
            .setTitle(infosTitle[cur])
            .addField('activate', infosActivateEmbed[cur])
            .addField('deactivate', infosDeactivateEmbed[cur])
            message.channel.send(infosModuleEmbed)
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected3 => {
              var collectedMsg3 = collected3.first().content.toUpperCase();
              if(collectedMsg3 === 'ACTIVATE'){
                con.query(`UPDATE serverSettings SET infos = 1 WHERE id = ${message.guild.id}`);
                message.channel.send(infosModuleActivate[cur])
              };
              if(collectedMsg3 === 'DEACTIVATE'){
                con.query(`UPDATE serverSettings SET infos = 0 WHERE id = ${message.guild.id}`);
                message.channel.send(infosModuleDeactivate[cur])
              };
            });
          };
          if(collectedMsg2 === 'WLM'){
              const wlmEmbed = new RichEmbed()
              .setTitle(wlTitleEmbed[cur])
              .addField('wlm', wlEmbed[cur])
              .addField('wlchannel', wlcembed[cur])
              .addField('wmessage', wmembed[cur])
              .addField('lmessage', lmembed);
              message.channel.send(wlmEmbed)
              const filter = m => m.author.id === message.author.id;
              message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected3 => {
                var collectedMsg3 = collected3.first().content.toUpperCase();
                if(collectedMsg3 === 'WLM'){
                  if(!res[0].wlchannel) return message.channel.send(wlmNoChannel[cur]);
                  const wlmModuleEmbed = new RichEmbed()
                    .setTitle(wlmTitleEmbed[cur])
                    .addField('activate', wlmActivateEmbed[cur])
                    .addField('deactivate', wlmDeactivateEmbed[cur]);
                  message.channel.send(wlmModuleEmbed)
                  const filter = m => m.author.id === message.author.id;
                  message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected4 => {
                    var collectedMsg4 = collected4.first().content.toUpperCase();
                    if(collectedMsg4 === 'ACTIVATE'){
                      con.query(`UPDATE serverSettings SET wlm = 1 WHERE id = ${message.guild.id}`);
                      message.channel.send(wlmActivate[cur])
                    }
                    if(collectedMsg4 === 'DEACTIVATE'){
                      con.query(`UPDATE serverSettings SET wlm = 0 WHERE id = ${message.guild.id}`);
                      message.channel.send(wlmDeactivate[cur])
                    };
                  });
                };
                if(collectedMsg3 === 'WLCHANNEL'){
                  message.channel.send(wlcInfo[cur])
                  const filter = m => m.author.id === message.author.id;
                  message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected4 => {
                    let wlchannel = collected4.first().mentions.channels.first().id;
                    if(!wlchannel)return message.channel.send(wlNotExist[cur]);
                    let wlcNewChannel = [`Der neue Welcome/Leave Kanal ist <#${wlchannel}>.`, `The new Welcome/Leave channel is <#${wlchannel}>`]
                    message.channel.send(wlcNewChannel[cur])
                    con.query(`UPDATE serverSettings SET wlchannel = ${wlchannel} WHERE id = ${message.guild.id}`);
                  });
                }
                if(collectedMsg3 === 'WMESSAGE'){
                  const wmessageEmbed = new RichEmbed()
                  .setTitle(wmTitle[cur])
                  .addField(wlVars[cur], wlVarsDes[cur])
                  .addField('${user}', wlUser[cur])
                  .addField('${server}', wlServer[cur])
                  message.channel.send(wmessageEmbed)
                  const filter = m => m.author.id === message.author.id;
                  message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected4 => {
                  con.query(`UPDATE serverSettings SET wm = '${collected4.first().content}' WHERE id = ${message.guild.id}`);
                  message.channel.send(wlmUpdated[cur])
                });
                }
                if(collectedMsg3 === 'LMESSAGE'){
                  const wmessageEmbed = new RichEmbed()
                  .setTitle(lmTitle[cur])
                  .addField(wlVars[cur], wlVarsDes[cur])
                  .addField('${user}', wlUser[cur])
                  .addField('${server}', wlServer[cur])
                  message.channel.send(wmessageEmbed)
                  const filter = m => m.author.id === message.author.id;
                  message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected4 => {
                  con.query(`UPDATE serverSettings SET lm = '${collected4.first().content}' WHERE id = ${message.guild.id}`);
                  message.channel.send(wlmUpdated[cur])
                });
                }
              });
          };
          if(collectedMsg2 === 'MONEY'){
            const moneyModuleEmbed = new RichEmbed()
              .setTitle(moneyTitle[cur])
              .addField('work', moneyWorkEmbed[cur])
              .addField('activate', moneyActivateEmbed[cur])
              .addField('deactivate', moneyDeactivateEmbed[cur]);
            message.channel.send(moneyModuleEmbed)
            const filter = m => m.author.id === message.author.id;
            message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected3 => {
              var collectedMsg3 = collected3.first().content.toUpperCase();
              if(collectedMsg3 === 'ACTIVATE'){
                con.query(`UPDATE serverSettings SET money = 1 WHERE id = ${message.guild.id}`);
                message.channel.send(moneyActivate[cur])
              };
              if(collectedMsg3 === 'DEACTIVATE'){
                con.query(`UPDATE serverSettings SET money = 0 WHERE id = ${message.guild.id}`);
                message.channel.send(moneyDeactivate[cur])
              };
              if(collectedMsg3 === 'WORK'){
                message.channel.send(moneyWorkMin[cur])
                const filter = m => m.author.id === message.author.id;
                message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected4 => {
                  con.query(`UPDATE serverSettings SET min = ${collected4.first().content} WHERE id = ${message.guild.id}`);
                }).then(err => {
              message.channel.send(moneyWorkMax[cur])
              message.channel.awaitMessages(filter, { max: 1, time: 60000 }).then(collected4 => {
                con.query(`UPDATE serverSettings SET max = ${collected4.first().content} WHERE id = ${message.guild.id}`);
            }).then(err => {
              con.query(`SELECT max, min FROM serverSettings WHERE id = ${message.guild.id}`, (err, resp) => {
                let moneyNewWork = [`Das minimale Einkommen ist ab jetzt: ${resp[0].min} und maximale: ${resp[0].max}`, `The minimum income is now: ${resp[0].min} and maximum: ${resp[0].max}`]
                message.channel.send(moneyNewWork[cur]);
              });
            });
          });
          };
          });
          };
      });
    }
    }).catch(err => {
      message.channel.send(canceled[cur])
    });
  });
}

module.exports.help = {
  name: "BOTSETTINGS"
}
