const discord = require('discord.js')
exports.run = (client, message, args) => {
  let command;
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  if (!command) {
    return message.channel.send({embed: new discord.RichEmbed().setTitle(`No Commands Found: ${args[0]}`).setColor(0xFFFF00)});
  } else {
    message.channel.send({embed: new discord.RichEmbed().setTitle(`Reloading \`${command}\`...`).setColor(0xFFFF00)}).then(m => {
        client.reload(command)
          .then(() => {
            m.edit({embed: new discord.RichEmbed().setTitle(`Success! The command \`${command}\` has been reloaded!`).setColor(0x00FF00)});
          })
          .catch(e => {
            m.edit({embed: new discord.RichEmbed().setTitle(`Command reload failed! \`${command}\`\n\`\`\`${e.stack}\`\`\``)});
          });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Reloads the command file, if it\'s been updated or modified.',
  usage: 'reload <commandname>'
};