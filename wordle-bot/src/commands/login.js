const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('login')
        .setDescription('Login a la app!'),
    async execute(interaction) {
        await interaction.reply('Dummy login')
    },
}
