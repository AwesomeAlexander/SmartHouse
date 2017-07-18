module.exports = (guild) => {
	guild.defaultChannel.send("This bot is private meaning its not allowed to invite!")
	guild.leave()
}