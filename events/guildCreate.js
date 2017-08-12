module.exports = (guild) => {
	guild.defaultChannel.send("This bot is private, so you can't invite it anywhere else, sorry!");
	guild.defaultChannel.send("If you'd like to join the server it's on, go to http://www.enter-the-house.com");
	guild.leave();
}
