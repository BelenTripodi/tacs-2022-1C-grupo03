const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('login')
        .setDescription('Login a la app!')
        .addStringOption((option) =>
            option
                .setName('username')
                .setDescription('Your username')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('password')
                .setDescription('Your passowrd')
                .setRequired(true)
        ),
    async execute(interaction) {
        try {
            const username = interaction.options.getString('username')
            const password = interaction.options.getString('password')

            console.log('Doing post')
            const response = await axios.get(
                `${process.env.BACKEND_URL}/login`,
                { username, password }
            )
            console.log('Response from mock', response.headers.authorization)
            interaction.user.jwt = response.headers.authorization
            await interaction.reply('Dummy login')
        } catch (error) {
            console.log('Error log in', { error })
        }
    },
}
