const { SlashCommandBuilder } = require('@discordjs/builders')
const { secretReply } = require('../response')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mychampionships')
        .setDescription('Responde con los campeonates activos del solicitante')
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
                `/users/${interaction.user.id}/championships`,
                {
                    params: { type },
                }
            )

            const data = buildResponse(response.data.championships)
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

const buildResponse = (championships) => {
    if (!championships.length) return 'No championships found'

    let str = ``
    for (let i = 0; i < championships.length; i++) {
        const elem = championships[i]
        const startDate = new Date(elem.startDate)
        const finishDate = new Date(elem.finishDate)

        const newStr = `
            Index: ${i}
            Name: ${elem.name}
            Languages: ${elem.languages.toString()}
            Start date: ${startDate.getDate()}/${
            startDate.getMonth() + 1
        }/${startDate.getFullYear()}
            Finish date: ${finishDate.getDate()}/${
            finishDate.getMonth() + 1
        }/${finishDate.getFullYear()}
        `
        str += newStr
    }
    return str
}
