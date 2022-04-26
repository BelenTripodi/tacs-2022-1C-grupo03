const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    data: new SlashCommandBuilder().setName('logout').setDescription('Logout!'),
    async execute(interaction) {
        console.log('token was ', interaction.user.jwt)
        interaction.user.jwt = null
        await interaction.reply('Logout!')
    },
}
