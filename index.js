// npm packages
const util = require('bot-utils');
var users = 0 
const Discord = require("discord.js");
const bot = new Discord.Client({
    disableEveryone: true
});
const config = require("./config.json");



const fs = require("fs");


bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) throw err;
	
	const jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0) {
		return console.log("[LOGS] Couldn't find commands!");
	}

	jsfile.forEach((f, i) => {
		let pull = require(`./commands/${f}`);
		  console.log(`[LOGS] ${f} loaded!`);
		bot.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach(alias => {
			bot.aliases.set(alias, pull.config.name)
		});
	});
});

bot.on("ready", async () => {
    bot.guilds.forEach(function(guild) { 
        users = guild.memberCount + users 
    });
    const activities_list = [
        "Support invite.gg/elementary | ss!help", 
        `${users.toLocaleString()} Users | ss!help`,
        `${bot.guilds.size} Guilds | ss!help`
        ];
    
        console.log(`[LOGS] Logged in to ${bot.user.username} (${bot.guilds.size} servers - ${bot.users.size} users)`)
        setInterval(() => {
            const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
            bot.user.setActivity(activities_list[index], {type: "WATCHING"}); // sets bot's activities to one of the phrases in the arraylist.
        }, 30000); // Runs this every 30 seconds.
        
        await bot.guilds.keyArray().forEach(id => {

bot.on('message', (message) => {  
    if (message.author.bot) return;

        
            var prefix = config.prefix
            if (message.content.startsWith(prefix)) {

            
                let messageArray = message.content.split(" ")
                let cmd = messageArray[0];
                let args = messageArray.slice(1);
        
                let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
                if(commandfile) commandfile.run(bot, message, args)
            };
        });
    });
});

//Login
bot.login(process.env.token);


