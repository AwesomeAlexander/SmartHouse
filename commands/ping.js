const discord = require('discord.js')

exports.run = (client, message) => {
	message.channel.send({embed: new discord.RichEmbed().setTitle(`:ping_pong: Pong! ${client.ping.toFixed(2)} ms.`).setColor(0x00FF00)})
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pong'],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping Pong! Catch that!',
  usage: 'ping'
};