const settings = require('../settings.json');
const fs = require('fs')
const discord = require('discord.js')
var stories = JSON.parse(fs.readFileSync("./jsondb/checkstory.json", "utf8"));
var kkkkkk = stories.find(function(rolez){ 
    return rolez.iddd === 42
})
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if(message.channel.id === '345660187748728832'){
      if(!message.content.startsWith(settings.prefix)){
        if(kkkkkk.storyoff === 1) return message.reply("Sorry but one-word stories is off! Please wait until the bot restarts!")
      fs.appendFile('./jsondb/stories.txt', message.content + " ")
        return;
      
      }

  }
  if (!message.content.startsWith(settings.prefix)) return;
  let command = message.content.split(' ')[0].slice(settings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
