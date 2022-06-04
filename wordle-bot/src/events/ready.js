module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)
        const channel = await client.channels.fetch('967572006704910364')
        channel.send("I'm back uwu")
    },
}
