const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

const host = process.env.BACKEND_HOST
const port = process.env.BACKEND_PORT

const baseUrl =
    process.env.ENV !== 'local'
        ? `http://${host}:${port}`
        : 'http://localhost:8080'

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

            const response = await axios.post(`${baseUrl}/login`, {
                username,
                password,
            })

            // me guardo el jwt y creo la instancia de axios para que el usuario haga request/post con el header incluido
            interaction.user.jwt = response.data.data.jwt
            interaction.user.axios = axios.create({
                baseURL: `${baseUrl}`,
                headers: { Authorization: `Bearer ${interaction.user.jwt}` },
            })

            await interaction.reply(
                `${interaction.user.tag} Logged in succesfully uwu`
            )
        } catch (error) {
            console.log('Error log in', { error })
            await interaction.reply('Login failed: wrong credentials')
        }
    },
}
