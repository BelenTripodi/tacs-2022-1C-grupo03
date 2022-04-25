const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder().setName('logout').setDescription('Logout!'),
    async execute(interaction) {
        await interaction.reply('Dummy logout')
    },
}
