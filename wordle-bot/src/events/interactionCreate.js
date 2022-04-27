const { checkAuth } = require('../auth')

module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        try {
            console.log(
                `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
            )
            if (!interaction.isCommand()) return

            checkAuth(interaction)
            const commandName = interaction.commandName
            interaction.client.commands.get(commandName).execute(interaction)
        } catch (error) {
            console.log('Error: ', error)
            interaction.reply('Error: user not authenticated')
        }
    },
}
