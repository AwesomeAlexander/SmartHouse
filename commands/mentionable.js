const fs = require('fs')
const discord = require('discord.js')
const settings = require('../settings.json')
exports.run = (client, message, args) => {
    if(message.guild.id !== '319618947894738961') return;
    if(!args[0]){
        return message.reply("Please put in a role name (not mention it)")
    }
    let role = message.guild.roles.find('name', args.splice(0).join(' '))
    if(!role) return message.reply("That isn't a valid role!")
    if(role.mentionable === true){
        role.setMentionable(false)
        message.channel.send("Successfully put `" + role.name + "` as not mentionable!")
    } else {
        role.setMentionable(true)
        message.channel.send("Successfully put `" + role.name + "` as mentionable!")
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['mention', 'ma'],
  permLevel: 3
};

exports.help = {
  name: 'mentionable',
  description: 'Make the role mentionable!',
  usage: 'mentionable <role>'
};