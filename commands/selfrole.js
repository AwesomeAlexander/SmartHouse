const fs = require('fs')
const discord = require('discord.js')
var selfroles = JSON.parse(fs.readFileSync("./jsondb/selfroles.json", "utf8"));



const settings = require('../settings.json')
exports.run = (client, message, args) => {
	if(message.guild.id !== '319618947894738961') return;



  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  

  let rolename = args[1]
  let category = args[0]

	let ahelp = new discord.RichEmbed().setTitle("Selfroles Administration Help").addField(settings.prefix + "selfrole add <role name>", "Adds a role to the selfrole list!").addField(`${settings.prefix}selfrole remove <role name>`, "Removes a role from the selfrole list!")
	if(category == "adminhelp"){
		if (!message.member.roles.has(admin_role.id)) return;
		message.channel.send({embed: ahelp})
		return;
	}
	if(category === "add"){
		if (!message.member.roles.has(admin_role.id)) return;
		if(!rolename) return message.reply("Please type in a role name!")
			let selfrolezz = message.guild.roles.find('name', rolename);
			if(!selfrolezz) return message.reply("That role doesn't exist!")
	var selfrolesearch = selfroles.find(function(rolez) {
		return rolez.rolename === rolename
	});

			if(selfrolesearch !== undefined) return message.reply("You have already put this selfrole on your server! Tell <@126119057232625664> or @Nobody to remove it!")

			selfroles.push({rolename: rolename, roleid: selfrolezz.id});
			fs.writeFileSync("./jsondb/selfroles.json", JSON.stringify(selfroles), "utf8");
			message.channel.send("Successfully added the `" + rolename + "` role!")
		return;
	}
	
	if(category === "remove"){
		if (!message.member.roles.has(admin_role.id)) return;



		if(!rolename) return message.reply("Please type in a role name!")

	var selfrolesearch = selfroles.find(function(rolez) {
		return rolez.rolename === rolename
	});

			let selfrolezz = message.guild.roles.find('name', rolename);
			if(selfrolesearch === undefined){ 
				message.reply("That role isn't in the selfroles list!")
			} else {
				console.log(selfroles.rolename)
				selfroles.splice(selfrolesearch.rolename.indexOf(rolename), 1);
			fs.writeFileSync("./jsondb/selfroles.json", JSON.stringify(selfroles), "utf8");
			message.channel.send("Successfully removed `" + rolename + "` from the selfroles list!")
		}

		return;
	}

	if(category === "list"){
          let str = "Selfrole list:\n";
          for (let i = 0; i < selfroles.length; i++) {
              str += `${selfroles[i].rolename}\n`
            
          }
          message.channel.send(str);

			return;
		/**
		selfroles.forEach(lol => {
			string = '\n'
			string+= `${lol.rolename}\n`
		})
		message.channel.send("Roles: " + string)
		//message.channel.send(selfroles.rolename)
		**/
		return;
	}
	
	if(category === "give"){
		if(!rolename) return message.reply("Please type in a role name!")

	var selfrolesearch = selfroles.find(function(rolez) {
		return rolez.rolename === rolename
	});
			let selfrolezz = message.guild.roles.find('name', rolename);
			if(selfrolesearch === undefined){ 
				message.reply("That role isn't in the selfroles list!")
			} else {
				message.member.addRoles(selfrolezz.id)
				message.channel.send("Successfully gave you the `" + rolename + "` role!")
		}


		return;
	}
	if(category === "take"){
		if(!rolename) return message.reply("Please type in a role name!")

	var selfrolesearch = selfroles.find(function(rolez) {
		return rolez.rolename === rolename
	});
			let selfrolezz = message.guild.roles.find('name', rolename);
			if(selfrolesearch === undefined){ 
				message.reply("That role isn't in the selfroles list!")
			} else {
				message.guild.member(message.author).removeRole(selfrolezz.id)
				message.channel.send("Successfully took away the `" + rolename + "` role!")
		}

		return;
	}

	if(!category){
		return message.reply(`Please type ${settings.prefix}selfrole help for more information!`)
	}
	
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sr'],
  permLevel: 0
};

exports.help = {
  name: 'selfrole',
  description: 'Allows others to get a selfrole!',
  usage: 'selfrole <categories> <name of role>'
};