const  Discord = require("discord.js");
const config = require("../config.json")
const prefix = config.prefix
const util = require('bot-utils');
var users = 0 


module.exports.run = async (bot, message, args) => {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    
    bot.guilds.forEach(function(guild) { 
        users = guild.memberCount + users 
    });
    
    let icon = message.author.displayAvatarURL;
    let user = message.author.username
    let bembed = new Discord.RichEmbed()
    .setColor("#1e8dc3")
    .setAuthor(`${bot.user.username} Info`, bot.user.displayAvatarURL)
    .addField("**Bot Name:**", bot.user.username, true)
    .addField("**Bot Owner:**", "<@249474587530625034>", true)
    .addField("**Server Count:**", bot.guilds.size, true)
    .addField("**User Count:**", bot.users.size, true)
    .addField("**Discord.JS Version:**", `11.5.1`, true)
    .addField("**NodeJS Version:**", process.version, true)
    .addField("**Bot Age:**", `${checkDays(bot.user.createdAt)}`, true)
    .addField("**Total Shards:**", `1/1`, true)
    .addField("**Bot Prefix:**", prefix, true)
    .setFooter(`Uptime: I've been alive for ${util.uptime()}`, icon)
    .setTimestamp();

    return message.channel.send(bembed);
}

module.exports.config  = {
    name: "botinfo",
    aliases: ["bot", "info", "bi"]
}