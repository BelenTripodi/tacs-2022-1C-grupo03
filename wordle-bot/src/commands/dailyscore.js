require('dotenv').config()
const { SlashCommandBuilder } = require('@discordjs/builders')
const { secretReply } = require('../utils')

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
                await secretReply(
                    interaction,
                    'Invalid score, should be a value between 0 and 6'
                )
                return
            }

            await interaction.user.axios.post(
                `/users/${interaction.user.appUsername}/score`,
                {
                    points: score,
                    language,
                }
            )
            await secretReply(interaction, `Score diario ingresado con exito!`)
        } catch (error) {
            console.log('Error updating score', { error })
            await secretReply(
                interaction,
                `Error: no tenes torneos registrados en ese idioma`
            )
        }
    },
}
