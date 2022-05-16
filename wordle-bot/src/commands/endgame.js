const { SlashCommandBuilder } = require('@discordjs/builders')
const { secretReply } = require('../response')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('endgame')
        .setDescription(
            'Termina la partida actual de wordle y borra los tries realizados hasta el momento'
        ),
    async execute(interaction) {
        interaction.user.tries = null
        await secretReply(interaction, 'Game ended')
    },
}
