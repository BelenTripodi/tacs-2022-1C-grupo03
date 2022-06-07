const { SlashCommandBuilder } = require('@discordjs/builders')
const axios = require('axios')

const host = process.env.BACKEND_HOST
const port = process.env.BACKEND_PORT

const baseURL =
    process.env.ENV !== 'local'
        ? `http://${host}:${port}`
        : 'http://localhost:8080'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('signup')
        .setDescription('Registrarse a la app!')
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

            const response = await axios.post(`${baseURL}/signup`, {
                username,
                password,
            })

            console.log(response)
            await interaction.reply(
                `${interaction.user.tag} Signed up succesfully uwu`
            )
        } catch (error) {
            console.log('Error sign up', { error })
            await interaction.reply(`${interaction.user.tag} Sign up failed`)
        }
    },
}
