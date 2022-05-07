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
        await interaction.reply(
            `${interaction.options.getString('type')} championships`
        )
    },
}
