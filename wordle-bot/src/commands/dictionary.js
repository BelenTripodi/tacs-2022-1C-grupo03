require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dictionary')
        .setDescription('Replies with word meaning')
        .addStringOption((option) =>
            option
                .setName('dictionary')
                .setDescription('Diccionario utilizado para buscar la palabra')
                .setRequired(true)
                .addChoices(
                    { name: 'spanish', value: 'spanish' },
                    { name: 'english', value: 'english' }
                )
        )
        .addStringOption((option) =>
            option
                .setName('word')
                .setDescription('Palabra a buscar')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const language = interaction.options.getString('language')
            const word = interaction.options.getString('word')
            const response = await axios.get(
                `${process.env.BACKEND_URL}/dictionary`,
                {
                    params: { word, language },
                }
            )
            console.log(response)
            await interaction.reply(`word meaning: sdasddasdas etc etc`)
        } catch (error) {
            console.log('Error fetching dictionary data', { error })
        }
    },
}
