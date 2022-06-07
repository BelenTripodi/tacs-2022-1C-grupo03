module.exports = {
    addUser: async (interaction) => {
        try {
            const userId = interaction.options.getString('userid')
            const championshipId =
                interaction.options.getString('championshipid')
            await interaction.user.axios.put(
                `/championships/${championshipId}/users`,
                { idUser: userId, owner: interaction.user.appUsername }
            )

            await interaction.reply(
                `${interaction.user.tag} has added User ID ${userId} to Championship ID ${championshipId} successfully`
            )
        } catch (error) {
            console.log('Error: error agregando usuario al torneo', error)
            await secretReply(interaction, 'Error agregando usuario al torneo')
        }
    },
}
