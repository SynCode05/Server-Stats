const Discord = require("discord.js");
const config = require("../config.json")
const prefix = config.prefix

module.exports.run = async (bot, message, args) => {
	let returned = "";
	let before = (new Date).getTime();
	let after = 0;
	let error = false;
	const args1 = message.content.split(" ").slice(1);
	const code = message.content.replace(".evaluation ", "").replace(".eval ", "").replace(".e ", "");
	if (!config.eval_access.includes(message.author.id))
	{
		message.channel.send('You do not have permission to use eval!');
		return;
	}
	try
	{
		let evaled = eval(code);
		
		if (typeof evaled !== "string")
			evaled = require("util").inspect(evaled);
		let cleaned = clean(evaled);
		if (cleaned !== undefined && cleaned != "undefined")
			returned = cleaned;
		else
			returned = "Code ran successfully, but didn't return anything";
	}
	catch (err)
	{
		returned = clean(err);
		error = true;
	}
	
	after = (new Date).getTime();
	let eembed = new Discord.RichEmbed().addField("**Evaluation Time**", (after - before) + "ms").addField(config.emojies.inbox_tray + " **Evaluation Input**", "```js\n" + code + "```").addField("**Evaluation Result**", "```xl\n" + returned + "```");
	if (error == false)
	{
		eembed.setColor("#5ffa76").setTitle(config.emojies.yes + " **Evaluation Successful!**");	
	}
	else
	{
		eembed.setColor("#ff4538").setTitle(config.emojies.no + " **Evaluation Unsuccessful!**");
	}
	
	message.channel.send(eembed);
}

function clean(text) {
	if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	else
		return text;
};



module.exports.config  = {
	name: "eval",
	aliases: ["e", "evaluation"]
}