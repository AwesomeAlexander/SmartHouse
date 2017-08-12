/**
      SmartHouse
    By FireMario211
  For The House server

**/
const discord = require('discord.js')
const client = new discord.Client()
const settings = require('./settings.json')
const fs = require('fs')
require('./util/eventLoader')(client)
var log = msg => console.log(msg)

client.commands = new discord.Collection();
client.aliases = new discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading ${files.length} commands...`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading a command named ${props.help.name}...`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  /* This function should resolve to an ELEVATION level which
     is then sent to the command handler for verification */
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', settings.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', settings.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (isOwner(message.author.id)) permlvl = 4;
  return permlvl;
};


function isOwner(id) {
      var ownerids = settings.ownerid
  return (ownerids.indexOf(id) > -1);
}

client.login(settings.token)
