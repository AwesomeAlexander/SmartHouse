const settings = require('../settings.json');
const discord = require('discord.js')
exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.author.send({embed: new discord.RichEmbed().setTitle(`***List of Commands***`).setDescription(`If you want to see details of the command, Use ${settings.prefix}help <commandname> for details of the command!\n\n${client.commands.map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`)});
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.sendEmbed(new discord.RichEmbed().setTitle(`${command.help.name} Help`).setDescription(`DESCRIPTION - \`${command.help.description}\`\nUSAGE - \`${command.help.usage}\``));
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'helpme'],
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
};