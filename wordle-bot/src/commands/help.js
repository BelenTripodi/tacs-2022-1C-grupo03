const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Replies with suggestions')
        .addStringOption((option) =>
            option
                .setName('try')
                .setDescription('<palabra>|<color_de_cada_letra>')
                .setRequired(true)
        ),
    async execute(interaction) {
        const currentTry = interaction.options.getString('try')
        interaction.user.tries.push(currentTry)
        const strTries = interaction.user.tries.reduce(
            (prev, current) => prev + current + ', ',
            ''
        )
        // sugerencias
        await interaction.reply(`word1\nword2\nword3\n`)
        // estado actual de la lista de intentos
        await interaction.followUp(`Tries: ${strTries}`)
    },
}
