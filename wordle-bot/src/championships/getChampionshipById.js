const { secretReply, buildChampionshipsString } = require('../utils')

module.exports = {
    getChampionshipById: async (interaction) => {
        try {
            const id = interaction.options.getInteger('id')
            const response = await interaction.user.axios.get(
                `/championships/${id}`
            )

            const data = buildChampionshipsString([response.data])
            const msg = `Championship ${id}:\n ${data}`

            await secretReply(interaction, msg)
        } catch (error) {
            console.log('Error: error obteniendo torneo', error)
            await secretReply(interaction, 'Error obteniendo torneo')
        }
    },
}
