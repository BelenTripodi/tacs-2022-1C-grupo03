const checkAuth = (interaction) => {
    if (
        !['login', 'ping', 'signup'].includes(interaction.commandName) &&
        !interaction.user.jwt
    ) {
        throw new Error('Error: user not authenticated')
    }
}

module.exports = {
    checkAuth,
}
