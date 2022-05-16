const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('championships')
        .setDescription('Responde con los campeonates disponibles')
        .addStringOption((option) =>
            option
                .setName('type')
                .setDescription('Visibilidad del campeonato')
                .setRequired(true)
                .addChoices(
                    { name: 'public', value: 'PUBLIC' },
                    { name: 'private', value: 'PRIVATE' }
                )
        ),
    async execute(interaction) {
        try {
            const type = interaction.options.getString('type')
            const response = await interaction.user.axios.get(
                '/championships',
                {
                    params: { type },
                }
            )

            const data = buildResponse(response.data.championships)
            await interaction.reply(
                `Active ${interaction.options.getString(
                    'type'
                )} championships:\n ${data}`
            )
        } catch (error) {
            console.log('Error: error obteniendo torneos', error)
        }
    },
}

const buildResponse = (championships) => {
    if (!championships.length) return 'No championships found'

    let str = ``
    for (let i = 0; i < championships.length; i++) {
        const elem = championships[i]
        console.log('Date', elem.startDate)
        // const startDate = JSON.parse(elem.startDate)
        // const finishDate = JSON.parse(elem.finishDate)
        // console.log('Date', startDate)
        // console.log(
        //     'Date month year',
        //     startDate.getDate(),
        //     startDate.getMonth(),
        //     startDate.getFullYear()
        // )
        const newStr = `
            Index: ${i}
            Name: ${elem.name}
            Languages: ${elem.languages.toString()}
        `
        str += newStr
    }
    return str
}
