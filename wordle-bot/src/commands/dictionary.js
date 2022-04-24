const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dictionary')
        .setDescription('Replies with word meaning')
        .addIntegerOption((option) =>
            option
                .setName('dictionary')
                .setDescription('Diccionario utilizado para buscar la palabra')
                .setRequired(true)
                .addChoices(
                    { name: 'Diccionario de la Lengua española', value: 0 },
                    { name: 'Diccionario de Oxford', value: 1 }
                )
        )
        .addStringOption((option) =>
            option
                .setName('word')
                .setDescription('Palabra a buscar')
                .setRequired(true)
        ),
    async execute(interaction) {
        console.log(interaction.commandName)
        console.log(interaction.options.getInteger('dictionary'))
        console.log(interaction.options.get())
        await interaction.reply(`word meaning: sdasddasdas etc etc`)
    },
}
