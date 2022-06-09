const { secretReply, buildChampionshipsString } = require('../utils')

module.exports = {
    getAll: async (interaction) => {
        try {
            const response = await interaction.user.axios.get(`/championships`)

            const msg = buildChampionshipsString(response.data.championships)

            await secretReply(interaction, 'Championships:\n' + msg)
        } catch (error) {
            console.log('Error: error obteniendo torneos', error)
            await secretReply(interaction, 'Error obteniendo torneos')
        }
    },
}
