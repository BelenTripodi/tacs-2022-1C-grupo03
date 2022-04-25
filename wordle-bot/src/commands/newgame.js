const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newgame')
        .setDescription(
            'Inicia un array de intentos para tu partida de wordle'
        ),
    async execute(interaction) {
        interaction.user.tries = []
        await interaction.reply({
            content: 'Game started',
            ephemeral: true,
        })
    },
}
