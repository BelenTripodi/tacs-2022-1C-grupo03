const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder().setName('logout').setDescription('Logout!'),
    async execute(interaction) {
        try {
            interaction.user.jwt = null
            await interaction.reply(`${interaction.user.tag} Logout`)
        } catch (error) {
            console.log('Error logout ', error)
            await interaction.reply('Error: logout')
        }
    },
}
