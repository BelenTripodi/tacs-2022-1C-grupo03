const { secretReply } = require('../utils')

module.exports = {
    addUser: async (interaction) => {
        try {
            const username = interaction.options.getString('username')
            const championshipId =
                interaction.options.getString('championshipid')
            await interaction.user.axios.put(
                `/championships/${championshipId}/users`,
                { username }
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
