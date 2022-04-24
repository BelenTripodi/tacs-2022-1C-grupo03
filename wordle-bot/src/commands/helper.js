const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helper')
        .setDescription('Replies with suggestions')
        .addStringOption((option) =>
            option
                .setName('gameStatus')
                .setDescription('Estado actual de las letras con sus colores')
        ),
    async execute(interaction) {
        console.log(interaction.commandName)
        console.log(interaction.options.getString('0'))
        await interaction.reply(`word1\nword2\nword3\n`)
    },
}
