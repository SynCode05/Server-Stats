const Discord = require("discord.js");
const config = require("../config.json")

module.exports.run = async (bot, message, args) => {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    
    };
    let verifLevels = ["Unrestricted", "Verified Email", "Registered for 5 Minutes", "Member for 10 Minutes", "Verified Phone Number"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa"
    };
    let icon = message.author.displayAvatarURL;
    let user = message.author.username
    let online = message.guild.members.filter(member => member.presence.status === 'online').size
    let idle = message.guild.members.filter(member => member.presence.status === 'idle').size
    let dnd = message.guild.members.filter(member => member.presence.status === 'dnd').size
    let inv = message.guild.members.filter(member => member.presence.status === 'offline').size
    let live = message.guild.members.filter(member => member.presence.status === 'streaming').size
    let sembed = new Discord.RichEmbed()
    .setColor("#1e8dc3")
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Guild Name:**", message.guild.name, true)
    .addField("**Guild Owner:**", message.guild.owner, true)
    .addField("**Role Count:**", message.guild.roles.size, true)
    .addField("**Total | Users | Bots**", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
    .addField("**Verification Level**", verifLevels[message.guild.verificationLevel], true)
    .addField("**Channel Count:**", message.guild.channels.size, true)
    .addField("**Online Count:**", `${config.emojies.onlinegif}${online}`, true)
    .addField("**Idle Count:**", `${config.emojies.idlegif}${idle}`, true)
    .addField("**DND Count:**", `${config.emojies.dndgif}${dnd}`, true)
    .addField("**Offline Count:**", `${config.emojies.offlinegif}${inv}`, true)
    .addField("**Streaming Count:**", `${config.emojies.livegif}${live}`, true)
    .addField("**Server Region:**", region[message.guild.region], true)
    .addField("**Server Created:**", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
    .addField("**Server ID:**", message.guild.id, true)
    .addField("**Server Prefix:**", "ss!", true)
    .setFooter(`Requested by ${user}`, icon);
    message.channel.send(sembed);
    
}

module.exports.config  = {
    name: "serverinfo",
    aliases: ["si", "server"]
}
