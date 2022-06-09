require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const { secretReply } = require('../utils')

const charToColour = {
    g: 'GREEN',
    n: 'GRAY',
    y: 'YELLOW',
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(
            'Responde con posibles palabras para ganar en el wordle'
        )
        .addStringOption((option) =>
            option
                .setName('try')
                .setDescription('<palabra>,<color_de_cada_letra>')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            // si no empezó la partida, corto la ejecucion de 1
            if (!interaction.user.match) {
                await secretReply(
                    interaction,
                    `Start a new game first pls. COMMAND /newgame`
                )
                return
            }

            // parseo del input
            const input = interaction.options.getString('try')
            const newTry = parseInput(input)
            updateTries(interaction, newTry)

            // post al backend sugerencias que falla por extraños motivos
            const response = await interaction.user.axios.post(
                `/help`,
                interaction.user.match
            )
            // respuesta al usuario
            await secretReply(
                interaction,
                response.data.possibleWords.join('\n')
            )

            await interaction.followUp({
                content: `Tries:\n${JSON.stringify(interaction.user.match)}`,
                ephemeral: true,
            }) // este mensaje lo podemos borrar en un futuro, era solo para testear el body del post
        } catch (error) {
            console.log('Error: fallo al obtener ayuda', { error })
            await secretReply(interaction, `Error al obtener ayuda`)
        }
    },
}

const parseInput = (input) => {
    if (!input) throw new Error('Input null')

    const arr = input.split(',')
    if (arr.length !== 2) throw new Error('format: string|colours')
    if (arr[0].length !== 5 || arr[1].length !== 5)
        throw new Error('Word and colours must have 5 chars length')
    if (arr[1].split('').some((char) => !'ygn'.includes(char.toLowerCase())))
        throw new Error(
            `Incorrect colours: options are y=yellow, g=green, n=none`
        )
    return arr
}

const updateTries = (interaction, newTry) => {
    // por cada caracter leido en newTry, genero un objeto de la forma
    // {
    //     "letter":
    //     "colour":
    // }
    const letters = []
    for (let i = 0; i < 5; i++) {
        letters.push({
            letter: newTry[0][i].toUpperCase(), // porque la api acepta solo uppercase sino no response
            colour: charToColour[newTry[1][i].toLowerCase()],
        })
    }
    interaction.user.match.tries.push({ letters })
}
