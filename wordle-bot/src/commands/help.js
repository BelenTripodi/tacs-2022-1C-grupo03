require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription(
            'Responde con posibles palabras para ganar en el wordle'
        )
        .addStringOption((option) =>
            option
                .setName('try')
                .setDescription('<palabra>|<color_de_cada_letra>')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            // parseo del input
            const input = interaction.options.getString('try')
            const arr = parseInput(input)
            updateTries(interaction, arr)

            // post al backend sugerencias que falla por extraños motivos
            const response = await axios.get(
                `${process.env.BACKEND_URL}/help`,
                interaction.user.tries
            )

            // respuesta al usuario
            await interaction.reply({
                content: JSON.stringify(response.data.possibleWords),
                ephemeral: true,
            })
            await interaction.followUp({
                content: `Tries:\n${JSON.stringify(interaction.user.tries)}`,
                ephemeral: true,
            })
        } catch (error) {
            console.log('Error: fallo al obtener ayuda', { error })
            await interaction.reply(`Error:`)
        }
    },
}

const parseInput = (input) => {
    if (!input) throw new Error('Input null')

    const arr = input.split('|')
    if (arr.length !== 2) throw new Error('format: string|colours')
    if (arr[0].length !== 5 || arr[1].length !== 5)
        throw new Error('Word and colours must have 5 chars length')
    if (arr[1].split('').some((char) => !'ygn'.includes(char)))
        throw new Error(
            `Incorrect colours: options are y=yellow, g=green, n=none`
        )
    return arr
}

const updateTries = (interaction, newTry) => {
    // por cada caracter leido en newTry, genero un objeto de la forma
    // {
    //     "letter":
    //     "color":
    // }
    const letters = []
    for (let i = 0; i < 5; i++) {
        letters.push({ letter: newTry[0][i], color: newTry[1][i] })
    }
    interaction.user.tries.push({ letters })
}
