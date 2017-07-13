/**
      SmartHouse
    By FireMario211
  For The House server

**/
const discord = require('discord.js')
const client = new discord.Client()
const settings = require('./settings.json')

client.on('ready' () => {
	console.log("Ready")
})

client.login(settings.token)
