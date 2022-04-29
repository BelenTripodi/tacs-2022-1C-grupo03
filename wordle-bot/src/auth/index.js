const checkAuth = (interaction) => {
    if (
        !['login', 'ping'].includes(interaction.commandName) &&
        !interaction.user.jwt
    ) {
        throw new Error('Error: user not authenticated')
    }
}

module.exports = {
    checkAuth,
}
