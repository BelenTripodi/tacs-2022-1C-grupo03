const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('helper')
        .setDescription('Replies with suggestions'),
    async execute(interaction) {
        console.log(interaction.commandName)
        await interaction.reply(`word1\nword2\nword3\n`)
    },
}
