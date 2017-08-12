const Discord = require('discord.js');
const fs = require('fs');
const settings = require('../settings.json')
exports.run = (client, message, args) => {
    if(!args[0]){
        return message.reply("Please put in some code!")
    }
	function clean(text) {
		if (typeof (text) === "string")
			return text.replace(/` /g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
		else
			return text;
	}


		//
		if (message.channel.type === 'dm') {
			message.author.sendMessage("I cannot respond with this command in DMS.")
			return;
		}

		//if(isBlacklistGuild(message.guild.id)) return message.reply(config.blacklist_message);
		//if(isBlacklistUser(message.author.id)) return message.reply(config.blacklist_message);
		//if(!isAdmin(message.author.id)) return message.reply("This command is disabled until fire re-enables it.");
		//if(!isOwner(message.author.id) === 0) return;
		//if(ordercountData.safemode === 4) return message.reply("Discord Tacos is in safe mode! Please wait while we try to fix somethings!")
		if (message.author.id !== '126119057232625664') return message.channel.send("Lawlz");

		var str = args.join(" ");
		var patt = new RegExp("token");
		var res = patt.test(str);

		if (res === true) return message.reply("nope")


		try {

			var code = args.join(" ");
			var evaled = eval(code);

			if (typeof evaled !== "string")
				evaled = require("util").inspect(evaled);
			//message.channel.sendMessage(":inbox_tray: **INPUT**\n")
			message.channel.sendEmbed(new Discord.RichEmbed().addField("Javascript Eval:", "Success!").addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```").addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```").setColor(0x00FF00))
			//message.channel.sendCode("xl", args.join(" "));
			//message.channel.sendMessage(":outbox_tray: **OUTPUT**\n")

			//message.channel.sendCode("xl", clean(evaled));

		} catch (err) {

			message.channel.sendEmbed(new Discord.RichEmbed().addField("Javascript Eval ERROR:", "There was a problem with the code your trying to run!").addField("Error", "```" + clean(err) + "```").setColor(0xFF0000))
			//message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}

}

  /*
     Functions
  */

  function clean(text) {
     if (typeof(text) === 'string')
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  else
   return text;
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['code'],
  permLevel: 4
};

exports.help = {
  name: 'eval',
  description: 'Eval!',
  usage: 'eval'
};