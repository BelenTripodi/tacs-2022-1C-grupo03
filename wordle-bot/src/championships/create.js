const { secretReply, buildChampionshipsString } = require('../utils')

const parseDate = (str) => {
    const arr = str.split('/')
    if (
        arr.length !== 3 ||
        arr[1] > 12 ||
        arr[1] < 1 ||
        arr[0] < 1 ||
        arr[0] > 31
    ) {
        throw new Error(
            'Respecta el formato de la fecha, no es tan complicado men'
        )
    }

    return new Date(arr[2], arr[1] - 1, arr[0])
}

const parseLanguages = (str) => {
    if (str === 'BOTH') return ['ENGLISH', 'SPANISH']
    else return [str]
}

module.exports = {
    create: async (interaction) => {
        try {
            const championship = {}
            championship.name = interaction.options.getString('name')
            championship.languages = parseLanguages(
                interaction.options.getString('languages')
            )
            championship.visibility = interaction.options.getString('type')
            championship.startDate = parseDate(
                interaction.options.getString('start')
            )
            championship.finishDate = parseDate(
                interaction.options.getString('finish')
            )
            championship.owner = interaction.user.appUsername

            const response = await interaction.user.axios.post(
                `/championships`,
                championship
            )
            championship.idChampionship = response.data.id

            const data = buildChampionshipsString([championship])
            const msg = `New ${interaction.options.getString(
                'type'
            )} championship created!:\n ${data}`

            await interaction.reply(msg)
        } catch (error) {
            console.log('Error: error obteniendo torneos', error)
            await secretReply(interaction, 'Error creando torneo')
        }
    },
}
