module.exports = {
    name: 'interactionCreate',
    execute(interaction) {
        console.log(
            `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
        )
        if (!interaction.isCommand()) return

        // aca podria agregar una funcion para ver si esta con el token

        const commandName = interaction.commandName
        interaction.client.commands.get(commandName).execute(interaction)
    },
}
