const discord = require('discord.js')
const client = new discord.Client()
exports.run = (client, message) => {

  

          message.channel.send("Are you sure you want to restart " + client.user.username + "?\n**React with :white_check_mark: If you want to restart the bot**\n**React with :x: If you dont want to restart the bot.**\n\n__This message will be deleted in 30 seconds.__")
            .then(mes => {
            	mes.react('✅')
            	mes.react('❌')
    let collector = mes.createReactionCollector(
      (reaction, user) => user.id === message.author.id,
      { time: 30000 }
    );
    collector.on(`collect`, r => {
      if(r.emoji.name==='✅') {
        message.channel.send(`**Restarting...**`);

        collector.stop();
        console.log(message.author.tag + " has restarted the bot!")
        setTimeout(function(){
        	process.exit()
        }, 1000)


      }else if(r.emoji.name==='❌') {
        message.channel.send("`COLLECTION STOPPED` - Restart has been cancelled.")
        collector.stop()
      }
    })
    collector.on(`end`, r => {
      mes.delete();
    })
            });
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'restart',
  description: 'Restart the bot!',
  usage: 'restart'
};