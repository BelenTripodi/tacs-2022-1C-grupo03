module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(
            `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
        )
        const commandName = interaction.commandName
        interaction.client.commands.get(commandName).execute(interaction)
    },
}
