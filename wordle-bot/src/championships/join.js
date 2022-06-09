module.exports = {
    join: async (interaction) => {
        try {
            const championshipId = interaction.options.getString('id')
            await interaction.user.axios.put(
                `/championships/${championshipId}/users`,
                { username: interaction.user.appUsername }
            )

            await interaction.reply(
                `${interaction.user.tag} has joined to championship ID ${championshipId} successfully`
            )
        } catch (error) {
            console.log('Error: error ingreando al torneo', error)
            await secretReply(interaction, 'Error ingresando al torneo')
        }
    },
}
