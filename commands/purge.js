const discord = require('discord.js')

exports.run = (client, message, args) => {
            let messagecount = parseInt(args[0]);
            if(isNaN(messagecount)) return message.reply("Please put in a message count!")
	    message.channel.fetchMessages({limit: messagecount})
	        .then(messages => message.channel.bulkDelete(messages));

			message.reply(":wastebasket: Successfully Purged `" + messagecount + "` messages.\n(Note that any message older than 2 weeks cannot be deleted)")
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['clear', 'prune'],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Clear the amount of messages given!',
  usage: 'purge <amount of messages>'
};