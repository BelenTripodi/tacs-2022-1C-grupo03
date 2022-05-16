require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dictionary')
        .setDescription('Replies with word meaning')
        .addStringOption((option) =>
            option
                .setName('language')
                .setDescription('Diccionario utilizado para buscar la palabra')
                .setRequired(true)
                .addChoices(
                    { name: 'spanish', value: 'SPANISH' },
                    { name: 'english', value: 'ENGLISH' }
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
            const response = await interaction.user.axios.get('/dictionary', {
                params: { word, language },
            })

            if (response.data.definition)
                await interaction.reply(
                    response.data.definition.charAt(0).toUpperCase() +
                        response.data.definition.slice(1)
                )
            else await interaction.reply(`Definition NOT FOUND for ${word}`)
        } catch (error) {
            console.log('Error fetching dictionary data', { error })
            await interaction.reply(`Error: fetch dictionary data ${word}`)
        }
    },
}
