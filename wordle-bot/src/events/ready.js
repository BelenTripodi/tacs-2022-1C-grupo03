require('dotenv')

const channelId = process.env.GENERAL_CHANNEL_ID

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)
        const channel = await client.channels.fetch(channelId)
        channel.send(`Logged in uwu`)
    },
}
