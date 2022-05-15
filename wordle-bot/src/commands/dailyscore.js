require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dailyscore')
        .setDescription('Permite cargar el score diario')
        .addIntegerOption((option) =>
            option
                .setName('score')
                .setDescription('Score obtenido, numero entre 0 y 6')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('language')
                .setDescription('Lenguaje utilizado cuando jugaste')
                .setRequired(true)
                .addChoices(
                    { name: 'spanish', value: 'SPANISH' },
                    { name: 'english', value: 'ENGLISH' }
                )
        ),
    async execute(interaction) {
        try {
            const score = interaction.options.getInteger('score')
            const language = interaction.options.getString('language')

            if (score > 6 || score < 0) {
                await interaction.reply(
                    'Invalid score, should be a value between 0 and 6'
                )
                return
            }

            const response = await interaction.user.axios.post(
                `/users/${interaction.user.id}/score`,
                {
                    points: score,
                    language,
                }
            )
            await interaction.reply(`Score diario ingresado con exito!`)
        } catch (error) {
            console.log('Error updating score', { error })
            await interaction.reply(`Error: error updating score`)
        }
    },
}
