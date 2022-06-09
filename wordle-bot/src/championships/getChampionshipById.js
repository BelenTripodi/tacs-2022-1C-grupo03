const {
    secretReply,
    buildChampionshipsString,
    buildScoresString,
} = require('../utils')

module.exports = {
    getChampionshipById: async (interaction) => {
        try {
            const id = interaction.options.getInteger('id')
            const response = await interaction.user.axios.get(
                `/championships/${id}`
            )
            const scoresResponse = await interaction.user.axios.get(
                `/championships/${id}/score`
            )

            const scores = scoresResponse.data
            const scoresStr = buildScoresString(scores.scores)
            let data = buildChampionshipsString([response.data])
            data = `Championship ${id}:\n ${data}
            Scores:
            ${scoresStr}
            `

            await secretReply(interaction, data)
        } catch (error) {
            console.log('Error: error obteniendo torneo', error)
            await secretReply(interaction, 'Error obteniendo torneo')
        }
    },
}
