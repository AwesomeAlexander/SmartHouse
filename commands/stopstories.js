const fs = require('fs')
const discord = require('discord.js')
var stories = JSON.parse(fs.readFileSync("./jsondb/checkstory.json", "utf8"));
var kkkkkk = stories.find(function(rolez){ 
    return rolez.iddd === 42
})
const settings = require('../settings.json')
exports.run = (client, message, args) => {
    if(kkkkkk.storyoff === 1) return message.reply("The storys are already disabled!")
    kkkkkk.storyoff = 1
    message.reply("Stories are disabled! If you want to enable them, please type /restart and restart the bot!")
    fs.writeFileSync("./jsondb/checkstory.json", JSON.stringify(stories), "utf8");
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sumstories', 'stopstory', 'sumstory'],
  permLevel: 3
};

exports.help = {
  name: 'stopstories',
  description: 'The command says it',
  usage: 'stopstories'
};