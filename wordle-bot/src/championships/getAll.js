const { secretReply, buildChampionshipsString } = require('../utils')

module.exports = {
    getAll: async (interaction) => {
        try {
            const response = await interaction.user.axios.get(`/championships`)

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
