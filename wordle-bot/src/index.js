require('dotenv').config()
const fs = require('node:fs')
const { Client, Collection, Intents } = require('discord.js')

const token = process.env.BOT_TOKEN

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.commands = new Collection()

const commandFiles = fs
    .readdirSync('./src/commands')
    .filter((file) => file.endsWith('.js'))

const eventFiles = fs
    .readdirSync('./src/events')
    .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    // Nuevo elemento al diccionario de comandos, donde la llave es el nombre del comando y
    // el valor, el objeto exportado desde su respectivo archivo en /commands
    // por eso la importancia de que el archivo tenga el mismo nombre que el comando que voy a usar posta.
    // Mismo approach con los eventos
    client.commands.set(command.data.name, command)
}

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

if (process.env.ENV === 'development') {
    const { server } = require('./mocks/server')
    server.listen({
        onUnhandledRequest(req) {
            console.error(
                'Found an unhandled %s request to %s',
                req.method,
                req.url.href
            )
        },
    })
    server.printHandlers()
    console.log('Worker started')
}

const host = process.env.BACKEND_HOST
const port = process.env.BACKEND_PORT

const baseUrl =
    process.env.ENV !== 'local'
        ? `http://${host}:${port}`
        : 'http://localhost:8080'

console.log('ENVIROMENT: ', process.env.ENV)
console.log(`Backend URL ${baseUrl}`)

client.login(token)
