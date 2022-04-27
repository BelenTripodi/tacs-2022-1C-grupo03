const checkAuth = (interaction) => {
    if (interaction.commandName !== 'login' && !interaction.user.jwt) {
        throw new Error('Error: user not authenticated')
    }
}

module.exports = {
    checkAuth,
}
