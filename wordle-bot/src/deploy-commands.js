require('dotenv').config()
const fs = require('node:fs')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const clientId = process.env.BOT_CLIENT_ID
const guildId = process.env.BOT_GUILD_ID
const token = process.env.BOT_TOKEN

const commands = []
const commandFiles = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(token)
// deploya los comandos para que puedan ser ejecutados luego en el servidor de discord
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error)
