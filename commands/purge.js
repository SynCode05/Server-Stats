const Discord = require("discord.js");
const config = require("../config.json")
const emoji = config.emojies
const moment = require('moment');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

  const number = Number(args[0]) === Number(args[0]) ? Number(args[0]) : null;
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return;
  if (number % 1 !== 0) return message.channel.send('Number needs to be a whole number.') 
  if ((number <= 0) || (number >= 100)) return message.channel.send('Number needs to be larger than 1, and smaller than 100.');
  let bulk; 
  await message.channel.bulkDelete(number + 1).then(total => bulk = total).catch(console.error);
  let bulkS = bulk.size
  
      

        //Embed
        const E = new Discord.RichEmbed()
        .setColor("#008000") 
        .setTitle("Purge")
        .setDescription(`${emoji.yes} Purge Successful!`)
        .addField(`Purged Messages`, `${bulkS}/${number + 1}`, true)
        .addField("Purge Mod", message.author.username, true)
        .addField("Channel Purged", message.channel, true)
        .setTimestamp();

        message.channel.send(E)

          const content = bulk.map(m => `[${moment(Number(m.createdTimestamp))}] ${m.author.tag} (${m.author.id}): ${m.attachments.size ? m.content + m.attachments.map(a => a.url).join`, `
          : m.embeds.length
          ? m.embeds.map(e => `${e.author || ''} ${e.description || ''} ${e.fields.map(f => (f.name + ' ') + ' | ' + (f.value + ' ')).join(', ')} ${e.footer || ''}`).join`,`
          : m.content || ''}`);
          const filename = `./${Date.now()}.txt`;
          fs.writeFileSync(filename, content.join`\n`, 'utf8');


          function d() {
              fs.unlinkSync(filename)
          }

          message.channel.send({files: [{ attachment: filename, name: `purged-content-${Date.now()}.txt` }]}).catch(console.error).then(setTimeout(d, 3000));
}
  
  module.exports.config = {
    name: 'purge',
    aliases: ['clear']
  }