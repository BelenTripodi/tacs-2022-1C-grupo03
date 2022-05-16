const { SlashCommandBuilder } = require('@discordjs/builders')
const { secretReply } = require('../utils')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newgame')
        .setDescription('Inicia un array de intentos para tu partida de wordle')
        .addStringOption((option) =>
            option
                .setName('language')
                .setDescription('Languange selected for the match')
                .setRequired(true)
                .addChoices(
                    { name: 'spanish', value: 'SPANISH' },
                    { name: 'english', value: 'ENGLISH' }
                )
        ),
    async execute(interaction) {
        const language = interaction.options.getString('language')
        interaction.user.match = { tries: [], language }
        await secretReply(interaction, 'Game started')
    },
}
