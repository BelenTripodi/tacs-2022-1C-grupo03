const { secretReply, buildChampionshipsString } = require('../utils')

module.exports = {
    getMyChampionships: async (interaction) => {
        try {
            const type = interaction.options.getString('type')
            const response = await interaction.user.axios.get(
                `/users/${interaction.user.appUsername}/championships`,
                {
                    params: { type },
                }
            )

            const msg = buildChampionshipsString(response.data.championships)

            await secretReply(interaction, 'My championships: \n' + msg)
        } catch (error) {
            console.log('Error: error obteniendo torneos', error)
            await secretReply(interaction, 'Error obteniendo torneos')
        }
    },
}
