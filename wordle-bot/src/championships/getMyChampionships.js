const { secretReply, buildChampionshipsString } = require('../utils')

module.exports = {
    getMyChampionships: async (interaction) => {
        try {
            const type = interaction.options.getString('type')
            const response = await interaction.user.axios.get(
                `/users/${interaction.user.id}/championships`,
                {
                    params: { type },
                }
            )

            const data = buildChampionshipsString(response.data.championships)
            const msg = `Active ${interaction.options.getString(
                'type'
            )} championships:\n ${data}`

            await secretReply(interaction, msg)
        } catch (error) {
            console.log('Error: error obteniendo torneos', error)
            await secretReply(interaction, 'Error obteniendo torneos')
        }
    },
}
