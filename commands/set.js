const fs = require('fs')
const discord = require('discord.js')
var modlogs = JSON.parse(fs.readFileSync("./jsondb/modlogs.json", "utf8"));
var welcome = JSON.parse(fs.readFileSync("./jsondb/welcome.json", "utf8"));
var leave = JSON.parse(fs.readFileSync("./jsondb/leave.json", "utf8"));

const settings = require('../settings.json')
exports.run = (client, message, args) => {
  if(message.guild.id !== '319618947894738961') return;
  let category = args[0]
  if(category === "welcome-channel"){
  	let welcomechannelnamez = args[1]
	let msg = args[2]
		if(!welcomechannelnamez) return message.reply("Please type in a channel name! (like `welcome`, not `#welcome`)!")
			let channelidz = message.guild.channels.find('name', welcomechannelnamez);
			if(!channelidz) return message.reply("Please type in a channel name! (like `welcome`, not `#welcome`)!")
			if(welcome.channelid === channelidz.id) return message.reply("You have already put this channel on your server!")
			if(!msg) return message.reply("Please put in a welcome message! (use {@user} as the mention and use {user} as the non-mention")
			welcome.push({channelname: channelidz, channelid: channelidz.id, welcomemsg: msg});
			fs.writeFileSync("./jsondb/welcome.json", JSON.stringify(welcome), "utf8");
			message.channel.send("Successfully set the welcome channel and the message!")
			return;
  }
  if(category === "leave-channel"){
  	let welcomechannelnamez = args[1]
	let msg = args[2]
		if(!welcomechannelnamez) return message.reply("Please type in a channel name! (like `bye`, not `#bye`)!")
			let channelidz = message.guild.channels.find('name', welcomechannelnamez);
			if(!channelidz) return message.reply("Please type in a channel name! (like `bye`, not `#bye`)!")
			if(leave.channelid === channelidz.id) return message.reply("You have already put this channel on your server!")
			if(!msg) return message.reply("Please put in a leave message! (use {@user} as the mention and use {user} as the non-mention")
			leave.push({channelname: channelidz, channelid: channelidz.id, leavemsg: msg});
			fs.writeFileSync("./jsondb/leave.json", JSON.stringify(leave), "utf8");
			message.channel.send("Successfully set the leave channel and the message!")
			return;
  }
  if(category === "modlogs"){
  	let welcomechannelnamez = args[1]
		if(!welcomechannelnamez) return message.reply("Please type in a channel name! (like `modlogs`, not `#modlogs`)!")
			let channelidz = message.guild.channels.find('name', welcomechannelnamez);
			if(!channelidz) return message.reply("Please type in a channel name! (like `modlogs`, not `#modlogs`)!")
			if(leave.channelid === channelidz.id) return message.reply("You have already put this channel on your server!")
			modlogs.push({channelname: channelidz, channelid: channelidz.id});
			fs.writeFileSync("./jsondb/leave.json", JSON.stringify(leave), "utf8");
			message.channel.send("Successfully set the leave channel and the message!")
			return;
  }
  if(!category){
  	message.reply("none")
  	return;
  }

}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['settings'],
  permLevel: 3
};

exports.help = {
  name: 'set',
  description: 'The command says it',
  usage: 'settings <category> <channel name or somethin>'
};